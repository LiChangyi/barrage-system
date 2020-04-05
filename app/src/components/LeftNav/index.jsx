import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

const preCls = 'left-nav';
const routerMap = [
  { path: '/', name: '弹幕窗口' },
  { path: '/barrage-list', name: '弹幕列表' },
  { path: '/filter-configure', name: '弹幕过滤' },
  { path: '/user', name: '个人中心' },
];

const Header = () => {
  return (
    <div className={preCls}>
      {routerMap.map((route) => (
        <NavLink
          className={`${preCls}-item`}
          key={route.path}
          to={route.path}
          exact
        >
          {route.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Header;
