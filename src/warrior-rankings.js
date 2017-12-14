import * as m from 'mithril';
import { roster, eliminations } from './data';
import { universeOf } from './utils';

export var WarriorRankings = {
  data: {},
  load: function() {
    for (var u in roster) {
      for (var i = 0; i < roster[u].warriors.length; i++) {
        var w = roster[u].warriors[i];
        WarriorRankings.data[w] = { numWins: 0, eliminatedOn: null, eliminatedBy: null };
      }
    }

    for (var i = 0; i < eliminations.length; i++) {
      var elimination = eliminations[i];
      var w = elimination.warrior;

      WarriorRankings.data[w].eliminatedOn = elimination.episode;
      WarriorRankings.data[w].eliminatedBy = elimination.by;

      for (var j = 0; j < elimination.by.length; j++) {
        var x = elimination.by[j];
        var points = 1 / elimination.by.length;
        WarriorRankings.data[x].numWins += points;
      }
    }
  },
};

export var WarriorRankingsTable = {
  oninit: WarriorRankings.load,
  view: function() {
    return m('div', Object.keys(WarriorRankings.data).map(function(w) {
      return m('div', [
        m('span', w),
        m('span', WarriorRankings.data[w].numWins),
        m('span', WarriorRankings.data[w].eliminatedOn != null ? WarriorRankings.data[w].eliminatedOn : '--'),
        m('span', WarriorRankings.data[w].eliminatedBy != null ? WarriorRankings.data[w].eliminatedBy.join(' & ') : '--'),
      ]);
    }));
  },
};