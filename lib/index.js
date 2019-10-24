import { fetchDataFromFMVoleyAPI } from './api';
import { lastWeekPageToText } from './formatUtils';
import LastWeekPage from './LastWeekPage';

const LAST_WEEK_STATS_ACTION = 'federapp_resultados';
const FEMALE_3DIV_GROUPA_ID = '3147';

fetchDataFromFMVoleyAPI({ endpointAction: LAST_WEEK_STATS_ACTION, groupId: FEMALE_3DIV_GROUPA_ID })
  .then((responseHTML) => new LastWeekPage(responseHTML))
  .then(lastWeekPageToText)
  .then(console.log);
