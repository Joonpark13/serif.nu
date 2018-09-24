import { combineReducers } from 'redux';
import * as actionTypes from '../actions/action-types';

export const initialSearchState = {
  isFetching: false,
  results: [],
};

export const search = (state = initialSearchState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_RESULTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case actionTypes.GET_SEARCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        results: action.searchResults,
      });
    case actionTypes.GET_SEARCH_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        results: initialSearchState.results,
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  search,
});

export default rootReducer;
