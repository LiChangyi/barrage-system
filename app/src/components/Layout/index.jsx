import React from 'react';

import LeftNav from '../LeftNav';
import './index.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <LeftNav />
      <main className="main">
        {children}
      </main>
    </div>
  );
};


export default Layout;
