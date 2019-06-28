import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { fetchSections } from 'effects/common';
import { fetchSearchResults, fetchSearchIndex } from 'effects/search';
import {
  fetchSearchResultsSuccess,
  fetchSearchResultsFailure,
  fetchSearchIndexSuccess,
  fetchSearchIndexFailure,
  fetchSectionsForSearchSuccess,
  fetchSectionsForSearchFailure,
} from 'actions';
import * as timeUtils from 'util/time';
import searchReducer, { initialSearchState } from './search';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

jest.mock('util/time');
jest.mock('effects/common');
jest.mock('effects/search');

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialSearchState);
  });

  it(`handles ${actionTypes.FETCH_SEARCH_INDEX}`, () => {
    const termId = '4740';
    const action = actionCreators.fetchSearchIndex(termId);
    expect(searchReducer(initialSearchState, action)).toEqual(
      loop(
        initialSearchState.set('isFetching', true),
        Cmd.run(fetchSearchIndex, {
          args: [action.currentTermId],
          successActionCreator: fetchSearchIndexSuccess,
          failActionCreator: fetchSearchIndexFailure,
        }),
      ),
    );
  });

  it(`handles ${actionTypes.FETCH_SEARCH_INDEX_SUCCESS}`, () => {
    const searchIndex = Symbol('searchIndex');
    const action = actionCreators.fetchSearchIndexSuccess(searchIndex);
    expect(searchReducer(initialSearchState, action)).toEqual(
      initialSearchState.set('searchIndex', searchIndex),
    );
  });

  it(`handles ${actionTypes.FETCH_SEARCH_INDEX_FAILURE}`, () => {
    const action = actionCreators.fetchSearchIndexFailure();
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.FETCH_SEARCH_RESULTS_REQUEST}`, () => {
    const termId = '4740';
    const state = fromJS({ isFetching: false });
    const action = actionCreators.fetchSearchResultsRequest(termId);

    expect(searchReducer(state, action)).toEqual(
      loop(
        fromJS({ isFetching: true }),
        Cmd.run(fetchSearchResults, {
          successActionCreator: fetchSearchResultsSuccess,
          failActionCreator: fetchSearchResultsFailure,
          args: [action.currentTermId, state.get('searchIndex'), action.searchInput],
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.FETCH_SEARCH_RESULTS_SUCCESS}`, () => {
    const state = fromJS({
      isFetching: true,
      results: [],
    });
    const testResults = [{ subject: 'EECS' }];
    const action = actionCreators.fetchSearchResultsSuccess(testResults);

    expect(searchReducer(state, action)).toEqual(fromJS({
      isFetching: false,
      results: testResults,
    }));
  });

  it(`should handle ${actionTypes.FETCH_SEARCH_RESULTS_FAILURE}`, () => {
    const state = fromJS({
      isFetching: false,
      results: [],
    });
    const action = actionCreators.fetchSearchResultsFailure();

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

  it(`should handle ${actionTypes.FETCH_SEARCH_RESULTS_REQUEST}`, () => {
    const termId = '4740';
    const searchInput = 'EECS';
    const action = actionCreators.fetchSearchResultsRequest(termId, searchInput);
    expect(searchReducer(initialSearchState, action)).toEqual(
      loop(
        initialSearchState.set('isFetching', true),
        Cmd.run(fetchSearchResults, {
          args: [action.currentTermId, initialSearchState.get('searchIndex'), action.searchInput],
          successActionCreator: fetchSearchResultsSuccess,
          failActionCreator: fetchSearchResultsFailure,
        }),
      ),
    );
  });

  it(`handles ${actionTypes.FETCH_SECTIONS_FOR_SEARCH_REQUEST}`, () => {
    const termId = '4740';
    const action = actionCreators.fetchSectionsForSearchRequest(termId, 'MEAS', 'EECS', '111-0');
    expect(searchReducer(initialSearchState, action)).toEqual(
      loop(
        initialSearchState.set('isFetching', true),
        Cmd.run(fetchSections, {
          args: [action.currentTermId, action.schoolId, action.subjectId, action.courseId],
          successActionCreator: fetchSectionsForSearchSuccess,
          failActionCreator: fetchSectionsForSearchFailure,
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.FETCH_SECTIONS_FOR_SEARCH_SUCCESS}`, () => {
    const state = fromJS({ currentSections: [], view: 'search' });
    const testResults = [{ id: '12345', section: '20' }];
    const action = actionCreators.fetchSectionsForSearchSuccess(testResults);

    expect(searchReducer(state, action))
      .toEqual(fromJS({ currentSections: testResults, view: 'sectionSelection' }));
  });

  it(`should handle ${actionTypes.FETCH_SECTIONS_FOR_SEARCH_FAILURE}`, () => {
    const state = fromJS({ currentSections: [], view: 'search' });
    const action = actionCreators.fetchSectionsForSearchFailure();

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
      results: [],
      currentSections: [],
      currentSearchInput: '',
    });
    const expectedResult = fromJS({
      view: 'search',
      results: [],
      currentSections: [],
      currentSearchInput: '',
      isFetching: false,
    });

    const action = actionCreators.viewSearch();
    expect(searchReducer(state, action)).toEqual(expectedResult);
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH}`, () => {
    const action = actionCreators.addSectionFromSearch({});
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH} if there are associated classes`, () => {
    timeUtils.isUnscheduled.mockReturnValue(false);
    const section = {
      associatedClasses: [{
        schedule: {
          dow: [
            'Fr',
          ],
          end: {
            hour: 13,
            minute: 50,
          },
          location: 'Annenberg Hall G01',
          start: {
            hour: 13,
            minute: 0,
          },
        },
        type: 'LAB',
      }],
      sectionNumber: '12',
    };
    const action = actionCreators.addSectionFromSearch(section);
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState.merge({
      view: 'associatedClassesSelection',
      currentSectionNumber: section.sectionNumber,
      currentAssociatedClasses: section.associatedClasses,
    }));
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH} if there are associated classes that are all unscheduled`, () => {
    timeUtils.isUnscheduled.mockReturnValue(true);
    const section = {
      associatedClasses: [{
        schedule: {
          dow: 'TBA',
          end: 'TBA',
          location: 'Annenberg Hall G01',
          start: 'TBA',
        },
        type: 'LAB',
      }],
      sectionNumber: '12',
    };
    const action = actionCreators.addSectionFromSearch(section);
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_SEARCH}`, () => {
    const action = actionCreators.addSectionWithAssociatedClassFromSearch({});
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.VIEW_SECTION_SELECTION}`, () => {
    const action = actionCreators.viewSectionSelection({});
    expect(searchReducer(initialSearchState, action))
      .toEqual(initialSearchState.set('view', 'sectionSelection'));
  });


  it(`should handle ${actionTypes.UPDATE_SEARCH_INPUT}`, () => {
    const state = fromJS({ currentSearchInput: '' });
    const searchInput = 'EECS';
    const action = actionCreators.updateSearchInput('EECS');

    expect(searchReducer(state, action)).toEqual(fromJS({ currentSearchInput: searchInput }));
  });
});
