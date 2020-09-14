import * as m from 'mithril';
import { AppState } from './app';

export var Layout = {
  view: function(vnode) {
    return m('.app' + ' .' + AppState.focus + '-focus', [
        m('.header', m('.outer-wrapper', m('.inner-wrapper', [
          m('.title', [
            m('span.big-title', 'DRAGON BALL SUPER: '),
            m('span.small-title', 'Tournament of Power Rankings'),
          ])
        ]))),
        m('.content', m('.outer-wrapper', m('.inner-wrapper', [
            m('.main-view', [
            m('.nav', [
              m(m.route.Link, {href: '/standings' }, 'Standings'),
              '/',
              m(m.route.Link, {href: '/universe-rankings' }, 'Universe Rankings'),
              '/',
              m(m.route.Link, {href: '/warrior-rankings' }, 'Warrior Rankings'),
            ]),
            vnode.attrs.mainView,
          ]),
          m('.side-view', vnode.attrs.sideView),
        ]))),
    ])
  }
};
