import 'dotenv/config';
import VError from 'verror';
import HinataCronJob from './HinataCronJob';
import HinataRepository from './repository';
import { customLog } from './shared';
import { HinataTelegramBot, TelegramBotUtils } from './telegramBot';

function main() {
  const groupId = process.env.FMVOLEY_GROUP_ID;
  if (!groupId) { throw new VError('Missing required environment variable: FMVOLEY_GROUP_ID'); }

  const hinataRepository = HinataRepository();
  const hinataCronJob = HinataCronJob({ repository: hinataRepository });
  const hinataTelegramBot = HinataTelegramBot({ repository: hinataRepository, groupId });
  const botUtils = TelegramBotUtils({ repository: hinataRepository });

  // CronJob-triggered Actions
  hinataCronJob.onNewStatsUpdate(async (newStats) => {
    await botUtils.messageAllUsersNewStats({ bot: hinataTelegramBot, newStats });
  });

  hinataCronJob.onSaveError((error) => { throw new VError(error, 'onSaveError'); });

  // Bot-triggered Actions
  hinataTelegramBot.onUserSubscribed(async (userData) => {
    await botUtils.messageUserAfterSubscription({ bot: hinataTelegramBot, userData, groupId });
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

  customLog('Hinata Started!');
}

main();
