import { fromJS } from 'immutable';

import {
  ADD_FILTER_RULE,
  INIT_FILTER_RULE,
  UPDATE_FILTER_RULE,
  DELETE_FILTER_RULE
} from './actionType';

const defaultState = fromJS([]);

export default (state = defaultState, action) => {
  const { data, type } = action;
  if (type === INIT_FILTER_RULE) {
    return data;
  }
  if (type === ADD_FILTER_RULE) {
    return state.unshift(data);
  }
  if (type === UPDATE_FILTER_RULE) {
    return state.set(data.index, data.update);
  }
  if (type === DELETE_FILTER_RULE) {
    return state.delete(data.index);
  }
  return state;
};
