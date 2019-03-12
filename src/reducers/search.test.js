import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { fetchSearchResults, fetchSearchIndex, fetchSections } from 'effects/search';
import {
  getSearchResultsSuccess,
  getSearchResultsFailure,
  fetchSearchIndexSuccess,
  fetchSearchIndexFailure,
  getSectionsSuccess,
  getSectionsFailure,
} from 'actions';
import searchReducer, { initialSearchState } from './search';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

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
          args: [action.termId],
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

  it(`should handle ${actionTypes.GET_SEARCH_RESULTS_REQUEST}`, () => {
    const state = fromJS({ isFetching: false });
    const action = actionCreators.getSearchResultsRequest();

    expect(searchReducer(state, action)).toEqual(
      loop(
        fromJS({ isFetching: true }),
        Cmd.run(fetchSearchResults, {
          successActionCreator: getSearchResultsSuccess,
          failActionCreator: getSearchResultsFailure,
          args: [state.get('searchIndex'), action.searchInput],
        }),
      ),
    );
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

  it(`should handle ${actionTypes.GET_SEARCH_RESULTS_REQUEST}`, () => {
    const searchInput = 'EECS';
    const action = actionCreators.getSearchResultsRequest(searchInput);
    expect(searchReducer(initialSearchState, action)).toEqual(
      loop(
        initialSearchState.set('isFetching', true),
        Cmd.run(fetchSearchResults, {
          args: [initialSearchState.get('searchIndex'), action.searchInput],
          successActionCreator: getSearchResultsSuccess,
          failActionCreator: getSearchResultsFailure,
        }),
      ),
    );
  });

  it(`handles ${actionTypes.GET_SECTIONS_REQUEST}`, () => {
    const action = actionCreators.getSectionsRequest('4740', 'MEAS', 'EECS', '111-0');
    expect(searchReducer(initialSearchState, action)).toEqual(
      loop(
        initialSearchState.set('isFetching', true),
        Cmd.run(fetchSections, {
          args: [action.termId, action.schoolId, action.subjectId, action.courseId],
          successActionCreator: getSectionsSuccess,
          failActionCreator: getSectionsFailure,
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.GET_SECTIONS_SUCCESS}`, () => {
    const state = fromJS({ currentSections: [], view: 'search' });
    const testResults = [{ id: '12345', section: '20' }];
    const action = actionCreators.getSectionsSuccess(testResults);

    expect(searchReducer(state, action))
      .toEqual(fromJS({ currentSections: testResults, view: 'sectionSelection' }));
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

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const action = actionCreators.addSection({});
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState);
  });

  it(`should handle ${actionTypes.ADD_SECTION} if there are associated classes`, () => {
    const section = { associatedClasses: [], sectionNumber: '12' };
    const action = actionCreators.addSection(section);
    expect(searchReducer(initialSearchState, action)).toEqual(initialSearchState.merge({
      view: 'associatedClassesSelection',
      currentSectionNumber: section.sectionNumber,
      currentAssociatedClasses: section.associatedClasses,
    }));
  });

  it(`should handle ${actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS}`, () => {
    const action = actionCreators.addSectionWithAssociatedClass({});
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
