import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

function standings() {
  var result = {};

  for (var u in roster) {
    var universe = roster[u];
    result[u] = { remainingWarriors: 10, warriors: {} };

    for (var i = 0; i < universe.warriors.length; i++) {
      var w = universe.warriors[i];
      result[u].warriors[w] = { isEliminated: false };
    }
  }

  for (var i = 0; i < eliminations.length; i++) {
    var w = eliminations[i].warrior;
    var u = universeOf(w);
    result[u].warriors[w].isEliminated = true;
    result[u].remainingWarriors--;
  }

  return result;
}

export var StandingsTable = {
  view: function() {
    var topStandings = standings();

    return m('table', m('tbody', Object.keys(topStandings).map(function(u) {
      var uData = topStandings[u];

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
