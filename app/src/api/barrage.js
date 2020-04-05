import axios from './index';

// 获取弹幕列表
export const getBarrageList = (params) => {
  return axios.get('/api/barrage/list', { params });
};

export default {};
