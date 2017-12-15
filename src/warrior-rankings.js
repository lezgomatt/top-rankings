import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

function warriorRankings() {
  var result = {};

  for (var u in roster) {
    for (var i = 0; i < roster[u].warriors.length; i++) {
      var w = roster[u].warriors[i];
      result[w] = { numWins: 0, eliminatedOn: null, eliminatedBy: null };
    }
  }

  for (var i = 0; i < eliminations.length; i++) {
    var elimination = eliminations[i];
    var w = elimination.warrior;

    result[w].eliminatedOn = elimination.episode;
    result[w].eliminatedBy = elimination.by;

    for (var j = 0; j < elimination.by.length; j++) {
      var x = elimination.by[j];
      var points = 1 / elimination.by.length;
      result[x].numWins += points;
    }
  }

  return result;
}

export var WarriorRankingsTable = {
  view: function() {
    var wRankings = warriorRankings();

    return m('table', [
      m('thead', [m('tr', [
        m('th.num-col', '#'),
        m('th', 'Warrior'),
        m('th', 'Wins'),
        m('th', 'Eliminated'),
      ])]),
      m('tbody', Object.keys(wRankings).map(function(w, i) {
        var wData = wRankings[w];
        return m('tr', [
          m('td.num-col', i+1),
          m('td', w),
          m('td', wData.numWins),
          m('td', wData.eliminatedOn == null ? 'No' : 'Episode ' + wData.eliminatedOn + ' by ' + wData.eliminatedBy.join(' & ')),
        ]);
      })),
    ]);
  },
};
