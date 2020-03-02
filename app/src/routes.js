import Loadable from 'react-loadable';
import Loading from 'components/Loading';

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


export const displayRoute = {
  path: '/display', name: '弹幕显示', component: AsyncDisplay
};

export default [
  { path: '/', name: '弹幕设置', component: AsyncHome },
  { path: '/User', name: '用户设置', component: AsyncUser }
];
