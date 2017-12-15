import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

export var Standings = {
  data: {},
  load: function() {
    for (var u in roster) {
      var universe = roster[u];
      Standings.data[u] = { remainingWarriors: 10, warriors: {} };

      for (var i = 0; i < universe.warriors.length; i++) {
        var w = universe.warriors[i];
        Standings.data[u].warriors[w] = { isEliminated: false };
      }
    }

    for (var i = 0; i < eliminations.length; i++) {
      var w = eliminations[i].warrior;
      var u = universeOf(w);
      Standings.data[u].warriors[w].isEliminated = true;
      Standings.data[u].remainingWarriors--;
    }
  },
};

export var StandingsTable = {
  oninit: Standings.load,
  view: function() {
    return m('table', m('tbody', Object.keys(Standings.data).map(function(u) {
      var uData = Standings.data[u];

      return m('tr', [
        m('th', [
          m('div', { class: uData.remainingWarriors <= 0 ? 'eliminated' : '' }, u),
          m('small', uData.remainingWarriors + '/10'),
        ]),
      ].concat(Object.keys(uData.warriors).map(function(w) {
          return m('td', { class: uData.warriors[w].isEliminated ? 'eliminated' : '' }, w);
      })));
    })));
  },
};
