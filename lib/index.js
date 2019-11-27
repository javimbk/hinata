import Context from './config/Context';
import Vars from './config/Vars';
import { customLog } from './shared';

function main() {
  const vars = Vars();
  const ctx = Context(vars);

  // CronJob-triggered Actions
  ctx.hinataCronJob.onNewStatsUpdate(async (newStats) => {
    await ctx.botUtils.messageAllUsersNewStats({ newStats });
  });

  // Bot-triggered Actions
  ctx.hinataTelegramBot.onUserSubscribed(async (userData) => {
    await ctx.botUtils.messageUserAfterSubscription({ userData });
  });

  ctx.hinataTelegramBot.onCheckCronJobRunning(async (chatId) => {
    const statusEmoji = ctx.hinataCronJob.isRunning() ? '✅' : '❌';
    await ctx.hinataTelegramBot.sendMessage(chatId, `CronJob Status: ${statusEmoji}`);
  });

  // Start Logic
  ctx.hinataCronJob.start();
  ctx.hinataTelegramBot.start();

  customLog('Hinata Started!');
}

main();
