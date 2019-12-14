import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

const preCls = 'header';
const routerMap = [
  { path: '/', name: '首页' },
  { path: '/about', name: '关于' },
];

const Header = () => {
  return (
    <div className={preCls}>
      {routerMap.map(route => (
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
