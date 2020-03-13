import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import barrageConfigure from './barrageConfigure/reducer';
import barrage from './barrage/reducer';


const reducer = combineReducers({
  barrageConfigure,
  barrage
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
