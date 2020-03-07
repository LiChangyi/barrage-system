import { fromJS } from 'immutable';
import { PUSH_ONE_BARRAGE } from './actionType';

const defaultState = fromJS([]);

export default (state = defaultState, action) => {
  if (action.type === PUSH_ONE_BARRAGE) {
    // 处理
    console.log(action);
  }
  return state;
};
