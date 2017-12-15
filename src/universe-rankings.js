import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf, universeName } from './utils';

function universeRankings() {
  var result = {};

  for (var u in roster) {
    var universe = roster[u];
    result[u] = { numRemaining: 10, numWins: 0, lastElimination: null };
  }

  for (var i = 0; i < eliminations.length; i++) {
    var elimination = eliminations[i];
    var w = elimination.warrior;
    var u = universeOf(w);

    result[u].numRemaining--;
    result[u].lastElimination = elimination.episode;

    for (var j = 0; j < elimination.by.length; j++) {
      var points = 1 / elimination.by.length;
      var v = universeOf(elimination.by[j]);
      result[v].numWins += points;
    }
  }

  return result;
}

export var UniverseRankingsTable = {
  view: function() {
    var uRankings = universeRankings();

    return m('table', [
      m('thead', [m('tr', [
        m('th.num-col', '#'),
        m('th', 'Universe'),
        m('th', 'Warriors Remaining'),
        m('th', 'Wins'),
        m('th', 'Eliminated'),
      ])]),
      m('tbody', Object.keys(uRankings).map(function(u, i) {
        var uData = uRankings[u];
        return m('tr', [
          m('td.num-col', i+1),
          m('td', universeName(u)),
          m('td', uData.numRemaining + '/10'),
          m('td', uData.numWins),
          m('td', uData.numRemaining > 0 ? 'No' : 'Episode ' + uData.lastElimination),  
        ]);
      })),
    ]);
  },
};
