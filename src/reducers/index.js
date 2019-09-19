import { combineReducers } from 'redux-loop-immutable';
import search from './search';
import schedule from './schedule';
import browse from './browse';

const rootReducer = combineReducers({
  search,
  schedule,
  browse,
});

export default rootReducer;
