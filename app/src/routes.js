import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const AsyncHome = Loadable({
  loader: () => import('pages/Home'),
  loading: Loading,
});

const AsyncAbout = Loadable({
  loader: () => import('pages/About'),
  loading: Loading,
});

export default [
  { path: '/', name: '首页', component: AsyncHome },
  { path: '/about', name: '关于我', component: AsyncAbout },
];
