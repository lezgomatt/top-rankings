import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf, universeName } from './utils';

export var UniverseRankings = {
  data: {},
  load: function() {
    for (var u in roster) {
      var universe = roster[u];
      UniverseRankings.data[u] = { numRemaining: 10, numWins: 0, lastElimination: null };
    }

    for (var i = 0; i < eliminations.length; i++) {
      var elimination = eliminations[i];
      var w = elimination.warrior;
      var u = universeOf(w);

      UniverseRankings.data[u].numRemaining--;
      UniverseRankings.data[u].lastElimination = elimination.episode;

      for (var j = 0; j < elimination.by.length; j++) {
        var points = 1 / elimination.by.length;
        var v = universeOf(elimination.by[j]);
        UniverseRankings.data[v].numWins += points;
      }
    }
  },
};

export var UniverseRankingsTable = {
  oninit: UniverseRankings.load,
  view: function() {
    return m('table', [
      m('thead', [m('tr', [
        m('th.num-col', '#'),
        m('th', 'Universe'),
        m('th', 'Warriors Remaining'),
        m('th', 'Wins'),
        m('th', 'Eliminated'),
      ])]),
      m('tbody', Object.keys(UniverseRankings.data).map(function(u, i) {
        var uData = UniverseRankings.data[u];
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
