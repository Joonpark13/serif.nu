import { fromJS } from 'immutable';
import { search as searchReducer, initialSearchState } from './index';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.GET_SEARCH_RESULTS_REQUEST}`, () => {
    const state = fromJS({ isFetching: false });
    const action = { type: actionTypes.GET_SEARCH_RESULTS_REQUEST };

    expect(searchReducer(state, action)).toEqual(fromJS({ isFetching: true }));
  });

  it(`should handle ${actionTypes.GET_SEARCH_RESULTS_SUCCESS}`, () => {
    const state = fromJS({
      isFetching: true,
      results: [],
    });
    const testResults = [{ subject: 'EECS' }];
    const action = actionCreators.getSearchResultsSuccess(testResults);

    expect(searchReducer(state, action)).toEqual(fromJS({
      isFetching: false,
      results: testResults,
    }));
  });

  it(`should handle ${actionTypes.GET_SEARCH_RESULTS_FAILURE}`, () => {
    const state = fromJS({
      isFetching: false,
      results: [],
    });
    const action = actionCreators.getSearchResultsFailure();

    expect(searchReducer(state, action)).toEqual(state);
  });

  it(`should handle ${actionTypes.CLEAR_SEARCH_RESULTS}`, () => {
    const state = fromJS({
      results: [{ name: 'My Course' }],
    });
    const action = actionCreators.clearSearchResults();

    expect(searchReducer(state, action)).toEqual(fromJS({
      results: [],
    }));
  });

  it(`should handle ${actionTypes.GET_SECTIONS_SUCCESS}`, () => {
    const state = fromJS({ currentSections: [], view: 'search' });
    const testResults = [{ id: '12345', section: '20' }];
    const action = actionCreators.getSectionsSuccess(testResults);

    expect(searchReducer(state, action)).toEqual(fromJS({ currentSections: testResults, view: 'sectionSelection' }));
  });

  it(`should handle ${actionTypes.GET_SECTIONS_FAILURE}`, () => {
    const state = fromJS({ currentSections: [], view: 'search' });
    const action = actionCreators.getSectionsFailure();

    expect(searchReducer(state, action)).toEqual(state);
  });

  it(`should handle ${actionTypes.SET_CURRENT_COURSE_NAME}`, () => {
    const state = fromJS({ currentCourseName: '' });
    const courseName = 'My Course';
    const action = actionCreators.setCurrentCourseName('My Course');

    expect(searchReducer(state, action)).toEqual(fromJS({ currentCourseName: courseName }));
  });

  it(`should handle ${actionTypes.VIEW_SEARCH}`, () => {
    const state = fromJS({
      view: 'search',
      results: [{ temp: 'temp data' }],
      currentSections: [],
    });
    const action = actionCreators.viewSearch();

    expect(searchReducer(state, action)).toEqual(fromJS({
      view: 'search',
      results: [],
      currentSections: [],
    }));
  });
});
