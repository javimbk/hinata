import { fetchDataFromFMVoleyAPI } from './api';
import { saveLastWeekPageToDB } from './db';
import { lastWeekPageToText } from './formatUtils';
import LastWeekPage from './LastWeekPage';

const LAST_WEEK_STATS_ACTION = 'federapp_resultados';
const FEMALE_3DIV_GROUPA_ID = '3147';

function fetchLastWeekForGroup({ groupId }) {
  return fetchDataFromFMVoleyAPI({ endpointAction: LAST_WEEK_STATS_ACTION, groupId })
    .then((responseHTML) => new LastWeekPage(responseHTML));
}

fetchLastWeekForGroup({ groupId: FEMALE_3DIV_GROUPA_ID })
  .then((lastWeekPage) => Promise.all([
    Promise.resolve(lastWeekPageToText(lastWeekPage)).then(console.log),
    saveLastWeekPageToDB(lastWeekPage),
  ]));
