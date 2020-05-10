import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const AsyncHome = Loadable({
  loader: () => import('pages/Home'),
  loading: Loading
});

const AsyncLogin = Loadable({
  loader: () => import('pages/Login'),
  loading: Loading
});

const AsyncRoom = Loadable({
  loader: () => import('pages/Room'),
  loading: Loading
});

export default [
  {
    path: '/',
    name: '首页',
    component: AsyncHome,
    shouldAuth: true,
  },
  {
    path: '/room/:id',
    name: '房间',
    component: AsyncRoom,
    shouldAuth: true,
  },
  {
    path: '/login',
    name: '登录',
    component: AsyncLogin,
    shouldAuth: false,
  }
];
