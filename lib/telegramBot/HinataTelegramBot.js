import TelegramBot from 'node-telegram-bot-api';
import { EventEmitter } from 'events';
import { lastWeekStatsToText } from '../formatUtils';
import { loadActiveUsersFromDB, storeActiveUsersToDB } from '../db';
import { createEventHandler } from '../shared';

const EVENT_CHECK_CRON_JOB_RUNNING = 'check_cron_job_running';
const EVENT_USER_SUBSCRIBED = 'user_subscribed';

export default function HinataTelegramBot({
  token = process.env.TELEGRAM_BOT_TOKEN,
} = {}) {
  const emitter = new EventEmitter();
  const onEventCallback = createEventHandler(emitter);

  if (!token) { throw new Error('There is no TG BOT TOKEN'); }
  const bot = new TelegramBot(token);

  const sendMessageToAllUsers = async (msg) => {
    const activeUsers = await loadActiveUsersFromDB();
    const msgPromises = activeUsers.chatIds.map((chatId) => bot.sendMessage(chatId, msg));
    const results = await Promise.all(msgPromises);
    return results;
  };

  const subscribeUser = async (chatId) => {
    const storedUsers = await loadActiveUsersFromDB();
    const storedChatIds = new Set(storedUsers.chatIds);
    const isNewUser = !storedChatIds.has(chatId);

    if (isNewUser) {
      storedChatIds.add(chatId);
      const updatedChatIds = [...storedChatIds];
      await storeActiveUsersToDB({ chatIds: updatedChatIds, count: updatedChatIds.length });
    }
    emitter.emit(EVENT_USER_SUBSCRIBED, { chatId, isNewUser });
  };

  const checkIfCronJobRunning = (chatId) => emitter.emit(EVENT_CHECK_CRON_JOB_RUNNING, chatId);

  return {
    start() {
      bot.on('message', async (msg) => {
        const chatId = msg && msg.chat && msg.chat.id;

        if (msg.text.toString().toLowerCase().indexOf('/start') === 0) {
          await subscribeUser(chatId);
        }
        if (msg.text.toString().toLowerCase().indexOf('/cron') === 0) {
          checkIfCronJobRunning(chatId);
        }
      });
      bot.startPolling();
    },
    stop() {
      bot.stopPolling();
    },
    sendMessage: bot.sendMessage.bind(bot),
    async notifyAllUsers(newLastWeekStats) {
      const lastWeekTxt = lastWeekStatsToText(newLastWeekStats);
      const userMsgs = sendMessageToAllUsers(lastWeekTxt);
      return userMsgs;
    },
    onUserSubscribed: onEventCallback(EVENT_USER_SUBSCRIBED),
    onCheckCronJobRunning: onEventCallback(EVENT_CHECK_CRON_JOB_RUNNING),
  };
}
