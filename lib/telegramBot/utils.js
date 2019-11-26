import VError from 'verror';
import { humanizedGroupId, lastWeekStatsToText } from '../formatUtils';
import HinataRepository from '../repository';
import { customLog, isEmpty } from '../shared';

export default function TelegramBotUtils({
  repository = HinataRepository(),
} = {}) {
  async function messageAllUsersNewStats({ bot, newStats }) {
    try {
      const userMsgs = await bot.notifyAllUsers(newStats);
      customLog(`Found New Stats! | 💬 Sent to ${userMsgs.length} Active Users`);
    } catch (error) {
      throw new VError(error, 'onNewStatsUpdate');
    }
  }

  async function messageUserAfterSubscription({ bot, userData, groupId }) {
    const { chatId, isNewUser } = userData;
    const humanGroupId = humanizedGroupId(groupId);

    if (isNewUser) {
      customLog(`👤 Successfully subscribed new user with chatId: ${chatId}`);
      await bot.sendMessage(chatId, `A partir de ahora recibirás updates de: ${humanGroupId}`);
      try {
        const storedWeekStats = await repository.getLastWeekStats();
        if (isEmpty(storedWeekStats)) { return; }

        await bot.sendMessage(chatId, lastWeekStatsToText(storedWeekStats));
        customLog('💬 Sent LastWeekStats to recently subscribed user!');
      } catch (error) {
        throw new VError(error, 'onUserSubscribed');
      }
    } else {
      await bot.sendMessage(chatId, 'Ya estás recibiendo updates, sólo tienes que esperar a recibir uno cuando haya.');
    }
  }

  return {
    messageAllUsersNewStats,
    messageUserAfterSubscription,
  };
}
