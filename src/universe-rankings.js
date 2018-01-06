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
    var rows = Object.keys(uRankings)
      .map(function(u) { return [u, uRankings[u]]; })
      .sort(function(a, b) {
        var nr = b[1].numRemaining - a[1].numRemaining;
        if (nr !== 0) return nr;

        var le = b[1].lastElimination - a[1].lastElimination;
        if (le !== 0) return le;

        var nw = b[1].numWins - a[1].numWins;
        if (nw !== 0) return nw;

        return a[0] - b[0];
      });

    return m('table', [
      m('thead', [m('tr', [
        m('th.num-col', '#'),
        m('th', 'Universe'),
        m('th', 'Warriors Remaining'),
        m('th', 'Wins'),
        m('th', 'Eliminated'),
      ])]),
      m('tbody', rows.map(function(r, i) {
        var u = r[0];
        var uData = uRankings[u];
        return m('tr', [
          m('td.num-col', i+1),
          m('td', universeName(u)),
          m('td', uData.numRemaining + '/10'),
          m('td', Math.round(uData.numWins * 100)/100),
          m('td', uData.numRemaining > 0 ? 'No' : 'Episode ' + uData.lastElimination),  
        ]);
      })),
    ]);
  },
};
