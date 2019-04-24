import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import * as actionTypes from 'actions/action-types';
import {
  getSearchResultsSuccess,
  getSearchResultsFailure,
  fetchSearchIndexSuccess,
  fetchSearchIndexFailure,
  getSectionsSuccess,
  getSectionsFailure,
} from 'actions';
import { fetchSections } from 'effects/common';
import { fetchSearchResults, fetchSearchIndex } from 'effects/search';

export const initialSearchState = fromJS({
  isFetching: false,
  searchIndex: undefined,
  results: [],
  view: 'search',
  currentCourseName: undefined,
  currentSectionNumber: undefined,
  currentSections: [],
  currentAssociatedClasses: [],
  currentSearchInput: '',
});

function handleAddSection(state, { section }) {
  if (section.associatedClasses) {
    return state.merge({
      view: 'associatedClassesSelection',
      currentSectionNumber: section.sectionNumber,
      currentAssociatedClasses: section.associatedClasses,
    });
  }
  return state
    .merge({
      view: 'search',
      results: initialSearchState.get('results'),
      currentSections: initialSearchState.get('currentSections'),
      currentSearchInput: initialSearchState.get('currentSearchInput'),
      isFetching: initialSearchState.get('isFetching'),
    });
}

function search(state = initialSearchState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_INDEX:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSearchIndex, {
          args: [action.termId],
          successActionCreator: fetchSearchIndexSuccess,
          failActionCreator: fetchSearchIndexFailure,
        }),
      );
    case actionTypes.FETCH_SEARCH_INDEX_SUCCESS:
      return state
        .set('isFetching', false)
        .set('searchIndex', action.searchIndex);
    case actionTypes.FETCH_SEARCH_INDEX_FAILURE:
      return state.set('isFetching', false); // TODO: Handle error

    case actionTypes.GET_SEARCH_RESULTS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSearchResults, {
          args: [state.get('searchIndex'), action.searchInput],
          successActionCreator: getSearchResultsSuccess,
          failActionCreator: getSearchResultsFailure,
        }),
      );
    case actionTypes.GET_SEARCH_RESULTS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('results', fromJS(action.searchResults));
    case actionTypes.GET_SEARCH_RESULTS_FAILURE:
      return state
        .set('isFetching', false)
        .set('results', initialSearchState.get('results'));
    case actionTypes.CLEAR_SEARCH_RESULTS:
      return state.set('results', fromJS([]));

    case actionTypes.GET_SECTIONS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSections, {
          args: [action.termId, action.schoolId, action.subjectId, action.courseId],
          successActionCreator: getSectionsSuccess,
          failActionCreator: getSectionsFailure,
        }),
      );
    case actionTypes.GET_SECTIONS_SUCCESS:
      return state
        .set('view', 'sectionSelection')
        .set('currentSections', fromJS(action.sections));
    case actionTypes.GET_SECTIONS_FAILURE:
      return state.set('currentSections', initialSearchState.get('currentSections'));

    case actionTypes.SET_CURRENT_COURSE_NAME:
      return state.set('currentCourseName', action.courseName);

    case actionTypes.VIEW_SEARCH:
      return state
        .merge({
          view: 'search',
          results: initialSearchState.get('results'),
          currentSections: initialSearchState.get('currentSections'),
          currentSearchInput: initialSearchState.get('currentSearchInput'),
          isFetching: initialSearchState.get('isFetching'),
        });

    case actionTypes.ADD_SECTION:
      return handleAddSection(state, action);
    case actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS:
      return state
        .merge({
          view: 'search',
          results: initialSearchState.get('results'),
          currentSections: initialSearchState.get('currentSections'),
          currentSearchInput: initialSearchState.get('currentSearchInput'),
          isFetching: initialSearchState.get('isFetching'),
          currentSectionNumber: initialSearchState.get('currentSectionNumber'),
          currentAssociatedClasses: initialSearchState.get('currentAssociatedClasses'),
        });

    case actionTypes.VIEW_SECTION_SELECTION:
      return state
        .merge({
          view: 'sectionSelection',
          currentSectionNumber: initialSearchState.get('currentSectionNumber'),
          currentAssociatedClasses: initialSearchState.get('currentAssociatedClasses'),
        });

    case actionTypes.UPDATE_SEARCH_INPUT:
      return state.set('currentSearchInput', action.searchInput);

    default:
      return state;
  }
}

export default search;
