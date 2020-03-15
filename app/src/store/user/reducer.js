import { fromJS } from 'immutable';

import { SET_USERINFO } from './actionTypes';

// 从 sessionStorage 中获取数据
const userinfoStr = window.sessionStorage.getItem('userinfo') || '{}';
let userinfo = {};
try {
  userinfo = JSON.parse(userinfoStr);
} catch (err) {
  console.log(err);
}

const defaultState = fromJS(userinfo);

export default (state = defaultState, action) => {
  if (action.type === SET_USERINFO) {
    const { data } = action;
    // 保存数据在本地
    window.sessionStorage.setItem('userinfo', JSON.stringify(data));
    return fromJS(data);
  }
  return state;
};
