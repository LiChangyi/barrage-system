import { message } from 'antd';
import { fromJS } from 'immutable';

import {
  getFilterRuleList,
  updateFilterRuleApi,
  addFilterRuleApi,
  deleteFilterRuleApi
} from '../../api/filterRule';
import {
  INIT_FILTER_RULE,
  ADD_FILTER_RULE,
  UPDATE_FILTER_RULE,
  DELETE_FILTER_RULE
} from './actionType';

export const initFilterRule = (dispatch) => {
  getFilterRuleList()
    .then(({ data = [] }) => {
      dispatch({
        type: INIT_FILTER_RULE,
        data: fromJS(data)
      });
    });
};

// 添加
export const addOneFilterRule = (data) => (dispatch) => {
  const key = 'addOneFilterRuleMessageKey';
  message.loading({ key, content: 'loading', duration: 0 });
  addFilterRuleApi(data)
    .then(({ data: resData }) => {
      message.success({ key, content: '添加成功' });
      dispatch({
        type: ADD_FILTER_RULE,
        data: fromJS(resData.data)
      });
    });
};

// 更新
export const updateFilterRule = (id, data) => (dispatch, getState) => {
  const key = 'updateFilterRuleMessageKey';
  message.loading({ key, content: 'loading', duration: 0 });
  updateFilterRuleApi(id, data)
    .then(() => {
      const list = getState().filterConfigure;
      const index = list.findIndex((o) => o.get('_id') === id);
      const update = list.get(index).merge(data);
      dispatch({
        type: UPDATE_FILTER_RULE,
        data: {
          index,
          update
        }
      });
      message.success('更新成功');
    });
};

// 删除
export const deleteFilterRule = (id) => (dispatch, getState) => {
  const key = 'deleteFilterRuleMessageKey';
  message.loading({ key, content: 'loading', duration: 0 });
  deleteFilterRuleApi(id)
    .then(() => {
      const list = getState().filterConfigure;
      const index = list.findIndex((o) => o.get('_id') === id);
      dispatch({
        type: DELETE_FILTER_RULE,
        data: {
          index
        }
      });
      message.success('删除成功');
    });
};

export default {};
