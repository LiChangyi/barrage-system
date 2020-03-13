import React from 'react';
import { Spin } from 'antd';

import './index.scss';

const preCls = 'loading';

const Loading = () => (
  <div className={preCls}>
    <Spin size="large" />
  </div>
);

export default Loading;
