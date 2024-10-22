import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import barrageConfigure from './barrageConfigure/reducer';
import barrage from './barrage/reducer';
import user from './user/reducer';
import filterConfigure from './filterConfigure/reducer';


const reducer = combineReducers({
  barrageConfigure,
  barrage,
  user,
  filterConfigure
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
