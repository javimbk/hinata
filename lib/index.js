import 'dotenv/config';
import VError from 'verror';
import { messageAllUsersNewStats, messageUserAfterSubscription } from './actions';
import HinataCronJob from './HinataCronJob';
import HinataTelegramBot from './HinataTelegramBot';
import { customLog } from './shared';

function main() {
  const hinataCronJob = HinataCronJob();
  const hinataTelegramBot = HinataTelegramBot();

  // CronJob-triggered Actions
  hinataCronJob.onNewStatsUpdate(async (newStats) => {
    await messageAllUsersNewStats({ bot: hinataTelegramBot, newStats });
  });

  hinataCronJob.onSaveError((error) => { throw new VError(error, 'onSaveError'); });

  // Bot-triggered Actions
  hinataTelegramBot.onUserSubscribed(async (userData) => {
    await messageUserAfterSubscription({ bot: hinataTelegramBot, userData });
  });

  hinataTelegramBot.onCheckCronJobRunning(async (chatId) => {
    const statusEmoji = hinataCronJob.isRunning() ? '✅' : '❌';
    await hinataTelegramBot.sendMessage(chatId, `CronJob Status: ${statusEmoji}`);
  });

  // CronJob Tracing
  hinataCronJob.onJobStart(() => customLog('CronJob executing...'));
  hinataCronJob.onOldStatsFetch(() => customLog('🔍 No New Updates Available'));

  // Start Logic
  hinataCronJob.start();
  hinataTelegramBot.start();

  // Teardown Logic
  process.on('exit', () => {
    hinataCronJob.stop();
    hinataTelegramBot.stop();
  });
  process.on('SIGINT', () => process.exit(1));
  process.on('uncaughtException', (e) => {
    console.error(e);
    process.exit(1);
  });
}

main();
