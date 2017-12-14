import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

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
    return m('div', Object.keys(UniverseRankings.data).map(function(u) {
      return m('div', [
        m('span', u),
        m('span', UniverseRankings.data[u].numRemaining + '/10'),
        m('span', UniverseRankings.data[u].numWins),
        m('span', UniverseRankings.data[u].numRemaining <= 0 ? UniverseRankings.data[u].lastElimination: '--'),
      ]);
    }));
  },
};
