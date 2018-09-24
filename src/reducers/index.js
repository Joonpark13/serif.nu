import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import * as actionTypes from '../actions/action-types';

export const initialSearchState = fromJS({
  isFetching: false,
  results: [],
});

export const search = (state = initialSearchState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCH_RESULTS_REQUEST:
      return state.set('isFetching', true);
    case actionTypes.GET_SEARCH_RESULTS_SUCCESS:
      return state.set('isFetching', false)
        .set('results', fromJS(action.searchResults));
    case actionTypes.GET_SEARCH_RESULTS_FAILURE:
      return state.set('isFetching', false)
        .set('results', initialSearchState.get('results'));
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  search,
});

export default rootReducer;
