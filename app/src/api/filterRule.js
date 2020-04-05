import axios from './index';

// 创建规则
export const addFilterRuleApi = (body) => {
  return axios.post('/api/filter-rule', body);
};

// 获取所有规则
export const getFilterRuleList = () => {
  return axios.get('/api/filter-rule/list');
};

// 更新规则
export const updateFilterRuleApi = (id, body) => {
  return axios.patch(`/api/filter-rule/${id}`, body);
};

// 删除规则
export const deleteFilterRuleApi = (id) => {
  return axios.delete(`/api/filter-rule/${id}`);
};

export default {};
