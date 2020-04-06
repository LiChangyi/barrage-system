import Loadable from 'react-loadable';
import Loading from 'components/Loading';

import init from './utils/init';

const AsyncHome = Loadable({
  loader: () => import('pages/Home'),
  loading: Loading,
});

const AsyncUser = Loadable({
  loader: () => import('pages/User'),
  loading: Loading,
});

const AsyncDisplay = Loadable({
  loader: () => import('pages/Display'),
  loading: Loading,
});

const AsyncBarrageList = Loadable({
  loader: () => import('pages/BarrageList'),
  loading: Loading
});

const AsyncFilterConfigure = Loadable({
  loader: () => import('pages/FilterConfigure'),
  loading: Loading
});


export const displayRoute = {
  path: '/display', name: '弹幕显示', component: AsyncDisplay
};

export default [
  {
    path: '/',
    name: '弹幕窗口',
    component: AsyncHome,
    beforeFunction: () => {
      init();
    },
    shouldAuth: true
  },
  {
    path: '/barrage-list',
    name: '弹幕统计',
    component: AsyncBarrageList,
    shouldAuth: true
  },
  {
    path: '/filter-configure',
    name: '弹幕过滤',
    component: AsyncFilterConfigure,
    beforeFunction: () => {
      init();
    },
    shouldAuth: true
  },
  {
    path: '/User',
    name: '个人中心',
    component: AsyncUser,
    shouldAuth: false
  }
];
