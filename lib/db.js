import fs from 'fs';
import { promisify } from 'util';

const TEMP_FILE_PATH = 'tmp/lastWeekPage.json';

function loadLastWeekPageFromDB() {
  return promisify(fs.readFile)(TEMP_FILE_PATH, { encoding: 'utf8' })
    .then(JSON.parse);
}

function saveLastWeekPageToDB(data) {
  const serializedData = JSON.stringify(data, null, 2);
  return promisify(fs.writeFile)(TEMP_FILE_PATH, serializedData);
}

export {
  loadLastWeekPageFromDB,
  saveLastWeekPageToDB,
};
