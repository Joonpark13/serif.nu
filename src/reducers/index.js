import { combineReducers } from 'redux-immutable';
import search from './search';
import schedule from './schedule';

const rootReducer = combineReducers({
  search,
  schedule,
});

export default rootReducer;
