import { fromJS } from 'immutable';
import * as actionTypes from '../actions/action-types';

export const initialSearchState = fromJS({
  isFetching: false,
  results: [],
  view: 'search',
  currentCourseName: undefined,
  currentSections: [],
  currentSearchInput: '',
});

function search(state = initialSearchState, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_RESULTS_REQUEST:
      return state.set('isFetching', true);
    case actionTypes.GET_SEARCH_RESULTS_SUCCESS:
      return state.set('isFetching', false)
        .set('results', fromJS(action.searchResults));
    case actionTypes.GET_SEARCH_RESULTS_FAILURE:
      return state.set('isFetching', false)
        .set('results', initialSearchState.get('results'));
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return state.set('results', fromJS([]));

    case actionTypes.GET_SECTIONS_SUCCESS:
      return state.set('view', 'sectionSelection')
        .set('currentSections', fromJS(action.sections));
    case actionTypes.GET_SECTIONS_FAILURE:
      return state.set('currentSections', initialSearchState.get('currentSections'));
    case actionTypes.SET_CURRENT_COURSE_NAME:
      return state.set('currentCourseName', action.courseName);

    case actionTypes.VIEW_SEARCH:
      return state.set('view', 'search')
        .set('currentSections', initialSearchState.get('currentSections'));

    case actionTypes.UPDATE_SEARCH_INPUT:
      return state.set('currentSearchInput', action.searchInput);

    default:
      return state;
  }
}

export default search;
