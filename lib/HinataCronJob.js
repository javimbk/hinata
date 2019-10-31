import { CronJob } from 'cron';
import { EventEmitter } from 'events';
import { getLastWeekStatsForGroup } from './api';
import { loadLastWeekStatsFromDB, saveLastWeekStatsToDB } from './db';
import { deepEquals, createEventHandler } from './shared';

const FEMALE_3DIV_GROUPA_ID = '3147';

const EVENT_FETCH_STATS_AND_COMPARE_START = 'fetch_week_stats_start';
const EVENT_OLD_WEEK_STATS = 'old_week_stats';
const EVENT_NEW_WEEK_STATS = 'new_week_stats';
const EVENT_SAVE_NEW_STATS_ERROR = 'save_new_stats_error';

export default function HinataCronJob() {
  const emitter = new EventEmitter();
  const onEventCallback = createEventHandler(emitter);

  const fetchLastWeekStatsAndNotifyIfNeeded = async () => {
    emitter.emit(EVENT_FETCH_STATS_AND_COMPARE_START);

    const [lastWeekStats, storedStats] = await Promise.all([
      getLastWeekStatsForGroup(FEMALE_3DIV_GROUPA_ID),
      loadLastWeekStatsFromDB(),
    ]);

    if (deepEquals(lastWeekStats, storedStats)) {
      emitter.emit(EVENT_OLD_WEEK_STATS);
    } else {
      emitter.emit(EVENT_NEW_WEEK_STATS, lastWeekStats);
    }
  };

  const saveLastWeekStats = async (lastWeekStats) => {
    try {
      await saveLastWeekStatsToDB(lastWeekStats);
    } catch (err) {
      emitter.emit(EVENT_SAVE_NEW_STATS_ERROR, err);
    }
  };

  const job = new CronJob('0 */30 * * * *', fetchLastWeekStatsAndNotifyIfNeeded);

  return {
    start() {
      emitter.on(EVENT_NEW_WEEK_STATS, saveLastWeekStats);
      job.start();
    },
    stop() {
      emitter.off(EVENT_NEW_WEEK_STATS, saveLastWeekStats);
      job.stop();
    },
    isRunning() {
      return job.running;
    },
    onJobStart: onEventCallback(EVENT_FETCH_STATS_AND_COMPARE_START),
    onOldStatsFetch: onEventCallback(EVENT_OLD_WEEK_STATS),
    onNewStatsUpdate: onEventCallback(EVENT_NEW_WEEK_STATS),
    onSaveError: onEventCallback(EVENT_SAVE_NEW_STATS_ERROR),
  };
}
