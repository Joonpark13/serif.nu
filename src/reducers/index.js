import { combineReducers } from 'redux-loop-immutable';
import search from './search';
import schedule from './schedule';
import browse from './browse';
import globals from './globals';

const rootReducer = combineReducers({
  search,
  schedule,
  browse,
  globals,
});

export default rootReducer;
