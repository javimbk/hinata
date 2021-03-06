import { CronJob } from 'cron';
import { EventEmitter } from 'events';
import VError from 'verror';
import { getLastWeekStatsForGroup } from './api';
import HinataRepository from './repository';
import { createEventHandler, customLog, deepEquals } from './shared';

const EVENT_FETCH_STATS_AND_COMPARE_START = 'fetch_week_stats_start';
const EVENT_OLD_WEEK_STATS = 'old_week_stats';
const EVENT_NEW_WEEK_STATS = 'new_week_stats';
const EVENT_SAVE_NEW_STATS_ERROR = 'save_new_stats_error';

export default function HinataCronJob({
  groupId = process.env.FMVOLEY_GROUP_ID,
  repository = HinataRepository(),
} = {}) {
  const emitter = new EventEmitter();
  const onEventCallback = createEventHandler(emitter);

  const fetchLastWeekStatsAndNotifyIfNeeded = async () => {
    emitter.emit(EVENT_FETCH_STATS_AND_COMPARE_START);

    const [lastWeekStats, storedStats] = await Promise.all([
      getLastWeekStatsForGroup(groupId),
      repository.getLastWeekStats(),
    ]);

    if (deepEquals(lastWeekStats, storedStats)) {
      emitter.emit(EVENT_OLD_WEEK_STATS);
    } else {
      emitter.emit(EVENT_NEW_WEEK_STATS, lastWeekStats);
    }
  };

  const saveLastWeekStats = async (lastWeekStats) => {
    try {
      await repository.storeLastWeekStats(lastWeekStats);
    } catch (err) {
      emitter.emit(EVENT_SAVE_NEW_STATS_ERROR, err);
    }
  };

  const job = new CronJob('0 */30 * * * *', fetchLastWeekStatsAndNotifyIfNeeded);

  // CronJob Tracing

  const onJobStart = onEventCallback(EVENT_FETCH_STATS_AND_COMPARE_START);
  const onNewStatsUpdate = onEventCallback(EVENT_NEW_WEEK_STATS);
  const onOldStatsFetch = onEventCallback(EVENT_OLD_WEEK_STATS);
  const onSaveError = onEventCallback(EVENT_SAVE_NEW_STATS_ERROR);

  onJobStart(() => customLog('CronJob executing...'));
  onOldStatsFetch(() => customLog('🔍 No New Updates Available'));
  onSaveError((error) => { throw new VError(error, 'onSaveError'); });

  return {
    start: () => {
      emitter.on(EVENT_NEW_WEEK_STATS, saveLastWeekStats);
      job.start();
    },
    stop: () => {
      emitter.off(EVENT_NEW_WEEK_STATS, saveLastWeekStats);
      job.stop();
    },
    isRunning: () => job.running,
    onJobStart,
    onNewStatsUpdate,
    onOldStatsFetch,
    onSaveError,
  };
}
