import HinataCronJob from '../HinataCronJob';
import HinataRepository from '../repository';
import { HinataTelegramBot, TelegramBotUtils } from '../telegramBot';
import { createContext } from './utils';
import Vars from './Vars';

export default function Context(vars = Vars()) {
  const ctx = createContext({
    hinataRepository: () => HinataRepository({
      url: vars.MONGODB_URL,
      dbName: vars.MONGODB_DBNAME,
    }),
    hinataCronJob: () => HinataCronJob({
      groupId: vars.FMVOLEY_GROUP_ID,
      repository: ctx.hinataRepository,
    }),
    hinataTelegramBot: () => HinataTelegramBot({
      token: vars.TELEGRAM_BOT_TOKEN,
      repository: ctx.hinataRepository,
    }),
    botUtils: () => TelegramBotUtils({
      bot: ctx.hinataTelegramBot,
      groupId: vars.FMVOLEY_GROUP_ID,
      repository: ctx.hinataRepository,
    }),
  });

  return ctx;
}
