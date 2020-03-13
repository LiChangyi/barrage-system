import axios from 'axios';
import { message } from 'antd';
import _ from 'lodash';

// 全局设置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use = instance.interceptors.request.use;

// request 拦截器
instance.interceptors.request.use((request) => {
  // 每次发送请求将 token 放在 header 中
  const userStr = window.localStorage.getItem('user') || '{}';
  const { token = '' } = JSON.parse(userStr);
  if (token) {
    request.headers.token = token;
  }
  return request;
}, (err) => {
  return Promise.reject(err);
});

// response 拦截器
instance.interceptors.response.use((response) => {
  // 这里是填坑内容
  return response;
}, (err) => {
  const msg = _.get(err, 'response.data.message') || '网络错误';
  const status = _.get(err, 'response.status');
  if (status === 401) {
    message.error('登录已失效，请重新登录', 2, () => {
      window.location.replace('/login');
    });
  } else {
    message.error(msg);
  }
  return Promise.reject(msg);
});

export default instance;
