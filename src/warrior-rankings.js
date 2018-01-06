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
    var rows = Object.keys(wRankings)
      .map(function(w) { return [w, wRankings[w]]; })
      .sort(function(a, b) {
        if (a[1].eliminatedOn == null && b[1].eliminatedOn != null) return -1;
        if (a[1].eliminatedOn != null && b[1].eliminatedOn == null) return 1;

        var eo = b[1].eliminatedOn - a[1].eliminatedOn;
        if (eo != 0) return eo;

        var nw = b[1].numWins - a[1].numWins;
        if (nw !== 0) return nw;

        return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
      });

    return m('table', [
      m('thead', [m('tr', [
        m('th.num-col', '#'),
        m('th', 'Warrior'),
        m('th', 'Wins'),
        m('th', 'Eliminated'),
      ])]),
      m('tbody', rows.map(function(r, i) {
        var w = r[0];
        var wData = wRankings[w];
        return m('tr', [
          m('td.num-col', i+1),
          m('td', w),
          m('td', Math.round(wData.numWins * 100)/100),
          m('td', wData.eliminatedOn == null ? 'No' : 'Episode ' + wData.eliminatedOn + ' by ' + wData.eliminatedBy.join(' & ')),
        ]);
      })),
    ]);
  },
};
