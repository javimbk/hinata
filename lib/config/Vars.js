import { createConfig } from './utils';

export default function Vars() {
  return createConfig({
    TELEGRAM_BOT_TOKEN: 'ask-botfather-on-telegram',
    FMVOLEY_GROUP_ID: '0000',
    MONGODB_URL: 'mongodb://localhost:27017',
    MONGODB_DBNAME: 'hinata-dev',
  });
}
