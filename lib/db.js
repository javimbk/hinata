import { promises as fs } from 'fs';
import VError from 'verror';

const TEMP_ACTIVE_USERS_FILE_PATH = 'tmp/activeUsers.json';
const TEMP_LAST_WEEK_FILE_PATH = 'tmp/lastWeekStats.json';

async function loadActiveUsersFromDB() {
  try {
    const file = await fs.readFile(TEMP_ACTIVE_USERS_FILE_PATH, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { chatIds: [], count: 0 };
    }
    throw new VError(error, 'Loading Active Users from DB Error');
  }
}

async function storeActiveUsersToDB(data) {
  try {
    const serializedData = JSON.stringify(data, null, 2);
    await fs.writeFile(TEMP_ACTIVE_USERS_FILE_PATH, serializedData);
  } catch (error) {
    throw new VError(error, 'Storing Active Users to DB Error');
  }
}

async function loadLastWeekStatsFromDB() {
  try {
    const file = await fs.readFile(TEMP_LAST_WEEK_FILE_PATH, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw new VError(error, 'Loading Last Week Stats from DB Error');
  }
}

async function saveLastWeekStatsToDB(data) {
  try {
    const serializedData = JSON.stringify(data, null, 2);
    await fs.writeFile(TEMP_LAST_WEEK_FILE_PATH, serializedData);
  } catch (error) {
    throw new VError(error, 'Storing Last Week Stats to DB Error');
  }
}

export {
  loadActiveUsersFromDB,
  storeActiveUsersToDB,
  loadLastWeekStatsFromDB,
  saveLastWeekStatsToDB,
};
