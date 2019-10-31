import fetch from 'node-fetch';
import VError from 'verror';
import LastWeekStats from './LastWeekStats';

const BASE_API_URL = 'https://fmvoley.com/wp-admin/admin-ajax.php';
const LAST_WEEK_STATS_ACTION = 'federapp_resultados';

async function fetchDataFromFMVoleyAPI({ endpointAction, groupId }) {
  try {
    const response = await fetch(BASE_API_URL, {
      method: 'POST',
      body: `action=${endpointAction}&grupo=${groupId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseHTML = await response.text();
    return responseHTML;
  } catch (error) {
    throw new VError(error, 'FMVoley Fetch Error');
  }
}

async function getLastWeekStatsForGroup(groupId) {
  const responseHTML = await fetchDataFromFMVoleyAPI({
    endpointAction: LAST_WEEK_STATS_ACTION,
    groupId,
  });
  const lastWeekStats = new LastWeekStats(responseHTML);
  return lastWeekStats;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getLastWeekStatsForGroup,
};
