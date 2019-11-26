function leagueStandingToText(standing) {
  return `${standing.position} | ${standing.teamName} | ${standing.points} Pts | ${standing.matchesWon} de ${standing.matchesPlayed} ganados | Dif. Puntos: ${standing.pointsWon} - ${standing.pointsLost}`;
}

function matchResultToText(matchInfo) {
  return (
    `${matchInfo.teams.local} vs. ${matchInfo.teams.away} \n`
    + `Resultado: ${matchInfo.matchResult} \n`
    + `(${matchInfo.detailedResult})`
  );
}

function lastWeekStatsToText(lastWeekStats) {
  const separator = '=======================';
  const headerText = lastWeekStats.groupInfo.join(' \n');
  const lastWeekResults = lastWeekStats.lastWeekResults.map(matchResultToText).join(' \n \n');
  const leagueStandings = lastWeekStats.leagueStandings.map(leagueStandingToText).join(' \n');
  return [headerText, separator, lastWeekResults, separator, leagueStandings].join(' \n \n');
}

function humanizedGroupId(groupId) {
  switch (groupId) {
    case '3147':
      return 'GRUPO A | 3RA DIV FEMENINO';
    default:
      return '';
  }
}

export {
  leagueStandingToText,
  matchResultToText,
  lastWeekStatsToText,
  humanizedGroupId,
};
