import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import App from './App';
import store from './store';
import './scss/global.scss';

const DOM = (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>
);

ReactDom.render(DOM, document.getElementById('root'));
