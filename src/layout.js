import * as m from 'mithril';

export var Layout = {
  view: function(vnode) {
    return m('.app', [
        m('.header', m('.outer-wrapper', m('.inner-wrapper', [
          m('.title', [
            m('span.big-title', 'Dragon Ball Super'),
            ' ',
            m('span.small-title', 'Tournament of Power Rankings'),
          ])
        ]))),
        m('.content', m('.outer-wrapper', m('.inner-wrapper', [
            m('.main-view', [
            m('.nav', [
              m('a', {href: '/standings', oncreate: m.route.link }, 'Standings'),
              '/',
              m('a', {href: '/universe-rankings', oncreate: m.route.link }, 'Universe Rankings'),
              '/',
              m('a', {href: '/warrior-rankings', oncreate: m.route.link }, 'Warrior Rankings'),
            ]),
            vnode.children[0],
          ]),
          m('.side-view', ''),
        ]))),
    ])
  }
};
