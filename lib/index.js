import 'dotenv/config';
import VError from 'verror';
import HinataCronJob from './HinataCronJob';
import HinataRepository from './repositories';
import { customLog } from './shared';
import { HinataTelegramBot, TelegramBotUtils } from './telegramBot';

async function main() {
  const hinataRepository = await HinataRepository();
  const hinataCronJob = HinataCronJob({ repository: hinataRepository });
  const hinataTelegramBot = HinataTelegramBot({ repository: hinataRepository });
  const botUtils = TelegramBotUtils({ repository: hinataRepository });

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
