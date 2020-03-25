import axios from 'axios';
import { message } from 'antd';
import _ from 'lodash';

import store from '../store';
import { setUser } from '../store/user/action';

// 全局设置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use = instance.interceptors.request.use;

// request 拦截器
instance.interceptors.request.use((request) => {
  // 每次发送请求将 token 放在 header 中
  const { token = '' } = store.getState().user.toJS();
  if (token) {
    request.headers.token = token;
  }
  // 获取baseURL
  const { serviceApi = '' } = store.getState().barrageConfigure.toJS();
  if (serviceApi) {
    request.baseURL = serviceApi;
  }
  return request;
}, (err) => {
  return Promise.reject(err);
});

// response 拦截器
instance.interceptors.response.use((response) => {
  // 销毁所有的 message
  message.destroy();
  return response;
}, (err) => {
  // 销毁所有的 message
  message.destroy();
  const msg = _.get(err, 'response.data.message') || '网络错误';
  const status = _.get(err, 'response.status');
  if (status === 401) {
    message.error('登录已失效，请重新登录', 2, () => {
      store.dispatch(setUser({}));
      window.location.replace('/user');
    });
  } else {
    message.error(msg);
  }
  return Promise.reject(msg);
});

export default instance;
