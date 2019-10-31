import 'dotenv/config';
import VError from 'verror';
import HinataCronJob from './HinataCronJob';
import { customLog } from './shared';
import HinataTelegramBot, { utils as botUtils } from './telegramBot';

function main() {
  const hinataCronJob = HinataCronJob();
  const hinataTelegramBot = HinataTelegramBot();

  // CronJob-triggered Actions
  hinataCronJob.onNewStatsUpdate(async (newStats) => {
    await botUtils.messageAllUsersNewStats({ bot: hinataTelegramBot, newStats });
  });

  hinataCronJob.onSaveError((error) => { throw new VError(error, 'onSaveError'); });

  // Bot-triggered Actions
  hinataTelegramBot.onUserSubscribed(async (userData) => {
    await botUtils.messageUserAfterSubscription({ bot: hinataTelegramBot, userData });
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
}

main();
