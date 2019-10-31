import VError from 'verror';
import { loadLastWeekStatsFromDB } from './db';
import { lastWeekStatsToText } from './formatUtils';
import { customLog, isEmpty } from './shared';

async function messageAllUsersNewStats({ bot, newStats }) {
  try {
    const userMsgs = await bot.notifyAllUsers(newStats);
    customLog(`Found New Stats! | 💬 Sent to ${userMsgs.length} Active Users`);
  } catch (error) {
    throw new VError(error, 'onNewStatsUpdate');
  }
}

async function messageUserAfterSubscription({ bot, userData }) {
  const { chatId, isNewUser } = userData;

  if (isNewUser) {
    customLog(`👤 Successfully subscribed new user with chatId: ${chatId}`);
    await bot.sendMessage(chatId, 'A partir de ahora recibirás updates del Grupo A de 3ra División Voley Femenino Madrid');
    try {
      const storedWeekStats = await loadLastWeekStatsFromDB();
      if (isEmpty(storedWeekStats)) { return; }

      await bot.sendMessage(chatId, lastWeekStatsToText(storedWeekStats));
      customLog('💬 Sent LastWeekPage to recently subscribed user!');
    } catch (error) {
      throw new VError(error, 'onUserSubscribed');
    }
  } else {
    await bot.sendMessage(chatId, 'Ya estás recibiendo updates, sólo tienes que esperar a recibir uno cuando haya.');
  }
}

export {
  messageAllUsersNewStats,
  messageUserAfterSubscription,
};
