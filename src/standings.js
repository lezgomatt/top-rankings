import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

export var Standings = {
  data: {},
  load: function() {
    for (var u in roster) {
      var universe = roster[u];
      Standings.data[u] = { numEliminated: 0, warriors: {} };

      for (var i = 0; i < universe.warriors.length; i++) {
        var w = universe.warriors[i];
        Standings.data[u].warriors[w] = { isEliminated: false };
      }
    }

    for (var i = 0; i < eliminations.length; i++) {
      var w = eliminations[i].warrior;
      var u = universeOf(w);
      Standings.data[u].warriors[w].isEliminated = true;
      Standings.data[u].numEliminated++;
    }
  },
};

export var StandingsTable = {
  oninit: Standings.load,
  view: function() {
    return m('div', Object.keys(Standings.data).map(function(u) {
      return m('div', [
        m('h1', { style: Standings.data[u].numEliminated >= 10 ? 'text-decoration: line-through;' : '' }, u),
        m('h2', (10 - Standings.data[u].numEliminated) + '/10'),
        m('ul', Object.keys(Standings.data[u].warriors).map(function(w) {
          return m('li', { style: Standings.data[u].warriors[w].isEliminated ? 'text-decoration: line-through' : '' }, w);
        })),
      ]);
    }));
  },
};
