import _ from 'lodash';

import axios from './index';

// 获取弹幕列表
export const getBarrageList = (params) => {
  return axios.get('/api/barrage/list', { params });
};

// 获取弹幕统计
export const getBarrageStatApi = (params) => {
  return axios.get('/api/barrage/echart', { params: _.omit(params, ['page', 'size']) });
};

export default {};
