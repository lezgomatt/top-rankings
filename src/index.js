import * as m from 'mithril';
import { StandingsTable } from './standings';
import { UniverseRankingsTable } from './universe-rankings';
import { WarriorRankingsTable } from './warrior-rankings';
import { Layout } from './layout';

m.route(document.body, '/standings', {
  '/standings': {
    render: function() {
      return m(Layout, m(StandingsTable));
    }
  },
  '/universe-rankings': {
    render: function() {
      return m(Layout, m(UniverseRankingsTable));
    }
  },
  '/warrior-rankings': {
    render: function() {
      return m(Layout, m(WarriorRankingsTable));
    }
  },
});
