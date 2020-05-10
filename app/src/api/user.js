import axios from './index';

// 获取用户登录 token
export const getToken = (body) => {
  return axios.post('/api/user/token', body);
};

// 修改用户密码
export const updatePwdApi = (body) => {
  return axios.patch('/api/user/password', body);
};

export default {};
