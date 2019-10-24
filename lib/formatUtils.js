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

function lastWeekPageToText(lastWeekPage) {
  const separator = '=======================';
  const headerText = lastWeekPage.groupInfo.join(' \n');
  const lastWeekResults = lastWeekPage.lastWeekResults.map(matchResultToText).join(' \n \n');
  const leagueStandings = lastWeekPage.leagueStandings.map(leagueStandingToText).join(' \n');
  return [headerText, separator, lastWeekResults, separator, leagueStandings].join(' \n \n');
}

function matchSetsArrayToText(matchSetsArray) {
  return matchSetsArray.filter((setResult) => setResult !== '0 - 0').join(' | ');
}

export {
  lastWeekPageToText,
  leagueStandingToText,
  matchResultToText,
  matchSetsArrayToText,
};
