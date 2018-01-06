import * as m from 'mithril';
import { StandingsTable } from './standings';
import { UniverseRankingsTable } from './universe-rankings';
import { WarriorRankingsTable } from './warrior-rankings';
import { Layout } from './layout';
import { AppState, App } from './app';

m.route(document.body, '/standings', {
  '/standings': {
    render: function () {
      AppState.mainView = 'standings';
      AppState.focus = 'main';

      return m(App);
    }
  },
  '/universe-rankings': {
    render: function () {
      AppState.mainView = 'u-rankings';
      AppState.focus = 'main';

      return m(App);
    }
  },
  '/warrior-rankings': {
    render: function () {
      AppState.mainView = 'w-rankings';
      AppState.focus = 'main';

      return m(App);
    }
  },
});
