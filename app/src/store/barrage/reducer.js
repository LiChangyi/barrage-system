import _ from 'lodash';
import { PUSH_ONE_BARRAGE } from './actionType';

const defaultState = [];

export default (state = defaultState, action) => {
  if (action.type === PUSH_ONE_BARRAGE) {
    const data = _.clone(state);
    if (data.length > 100) {
      data.shift();
    }
    data.push(action.data);
    return data;
  }
  return state;
};
