import * as m from 'mithril';
import { StandingsTable } from './standings';
import { UniverseRankingsTable } from './universe-rankings';
import { WarriorRankingsTable } from './warrior-rankings';
import { Layout } from './layout';
import { SideViewHint } from './side-view-hint';

export var AppState = {
  mainView: 'standings',
  sideView: 'hint',
  universe: null,
  warrior: null,
  focus: 'main',
};

var mainViewComponent = {
  'standings': StandingsTable,
  'u-rankings': UniverseRankingsTable,
  'w-rankings': WarriorRankingsTable,
};

var sideViewComponent = {
  'hint': SideViewHint,
  // 'u-stats': UniverseRankingsTable,
  // 'w-stats': WarriorRankingsTable,
};

export var App = {
  view: function() {
    var mainView = m(mainViewComponent[AppState.mainView]);
    var sideView = m(sideViewComponent[AppState.sideView]);

    return m(Layout, { mainView: mainView, sideView: sideView });
  },
};
