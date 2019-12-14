import React from 'react';
import { Tag } from 'antd';

import LogoSvg from 'images/logo.svg';
import './index.scss';

const preCls = 'home';

const Home = () => {
  return (
    <div className={preCls}>
      <img className={`${preCls}-logo`} src={LogoSvg} alt="logo" />
      <Tag
        color="#108ee9"
      >
        react 脚手架
      </Tag>
    </div>
  );
};

export default Home;
