import cheerio from 'cheerio';
import { matchSetsArrayToText } from './formatUtils';

function selectCheerioText(elem) {
  return elem.text().trim();
}

export default function LastWeekPage(stringHTML) {
  const $ = cheerio.load(stringHTML);

  const headerTableRowElements = $('.resultados_clasificacion .encabezado tbody tr');
  const headerTexts = headerTableRowElements.map((_, el) => $(el).text()).toArray();
  const matchRowElements = $('.resultados_clasificacion .resultados tbody tr:not(.parentTR)');

  const lastWeekResults = matchRowElements.map((_, matchRowElement) => {
    const rowCells = $('td', matchRowElement);
    const matchSetsCells = rowCells.slice(-5); // Last 5 cells of the table belong to match sets
    const matchSetsArray = matchSetsCells
      .map((__, el) => selectCheerioText($(el)))
      .toArray();

    return {
      matchDate: selectCheerioText($(rowCells[0])),
      teams: {
        local: selectCheerioText($(rowCells[2])),
        away: selectCheerioText($(rowCells[3])),
      },
      matchResult: selectCheerioText($(rowCells[4])),
      detailedResult: matchSetsArrayToText(matchSetsArray),
    };
  }).toArray();

  const leagueStandingsRowElements = $('.resultados_clasificacion .clasificacion tbody tr');
  const leagueStandings = leagueStandingsRowElements.map((_, leagueStandingsRowElement) => {
    const rowCells = $('td', leagueStandingsRowElement);

    return {
      position: selectCheerioText($(rowCells[0])),
      teamName: selectCheerioText($(rowCells[1])),
      points: selectCheerioText($(rowCells[2])),
      matchesPlayed: selectCheerioText($(rowCells[3])),
      matchesWon: selectCheerioText($(rowCells[4])),
      pointsWon: selectCheerioText($(rowCells[14])),
      pointsLost: selectCheerioText($(rowCells[15])),
    };
  }).toArray();

  return {
    groupInfo: headerTexts,
    lastWeekResults,
    leagueStandings,
  };
}
