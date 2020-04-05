import axios from './index';

// 获取用户登录 token
export const getToken = (body) => {
  return axios.post('/api/user/token', body);
};

export default {};
