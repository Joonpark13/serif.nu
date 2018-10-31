import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actionTypes from './action-types';
import * as actionCreators from './index';
import { searchURL, sectionsURL } from '../util/api';

describe('action creators', () => {
  describe('getSearchResults', () => {
    it(`should create a ${actionTypes.GET_SEARCH_RESULTS_REQUEST}`, () => {
      expect(actionCreators.getSearchResultsRequest())
        .toEqual({ type: actionTypes.GET_SEARCH_RESULTS_REQUEST });
    });

    it(`should create a ${actionTypes.GET_SEARCH_RESULTS_SUCCESS}`, () => {
      const searchResults = { subject: 'EECS' };

      expect(actionCreators.getSearchResultsSuccess(searchResults))
        .toEqual({
          type: actionTypes.GET_SEARCH_RESULTS_SUCCESS,
          searchResults,
        });
    });

    it(`should create a ${actionTypes.GET_SEARCH_RESULTS_FAILURE}`, () => {
      expect(actionCreators.getSearchResultsFailure())
        .toEqual({ type: actionTypes.GET_SEARCH_RESULTS_FAILURE });
    });

    it(`should create a ${actionTypes.CLEAR_SEARCH_RESULTS}`, () => {
      expect(actionCreators.clearSearchResults())
        .toEqual({ type: actionTypes.CLEAR_SEARCH_RESULTS });
    });
  });

  describe('getSections', () => {
    it(`should create a ${actionTypes.GET_SECTIONS_REQUEST}`, () => {
      expect(actionCreators.getSectionsRequest())
        .toEqual({ type: actionTypes.GET_SECTIONS_REQUEST });
    });

    it(`should create a ${actionTypes.GET_SECTIONS_SUCCESS}`, () => {
      const sections = [];

      expect(actionCreators.getSectionsSuccess(sections))
        .toEqual({
          type: actionTypes.GET_SECTIONS_SUCCESS,
          sections,
        });
    });

    it(`should create a ${actionTypes.GET_SECTIONS_FAILURE}`, () => {
      expect(actionCreators.getSectionsFailure())
        .toEqual({ type: actionTypes.GET_SECTIONS_FAILURE });
    });

    it(`should create a ${actionTypes.SET_CURRENT_COURSE_NAME}`, () => {
      const courseName = 'My Course';

      expect(actionCreators.setCurrentCourseName(courseName))
        .toEqual({
          type: actionTypes.SET_CURRENT_COURSE_NAME,
          courseName,
        });
    });
  });

  describe('viewSearch', () => {
    it(`should create a ${actionTypes.VIEW_SEARCH}`, () => {
      expect(actionCreators.viewSearch()).toEqual({ type: actionTypes.VIEW_SEARCH });
    });
  });
});

describe('async action creators', () => {
  const mockStore = configureMockStore([thunk]);

  afterEach(() => {
    fetchMock.reset();
  });

  describe('fetchSearchResults', () => {
    let store;
    const query = 'EECS';

    beforeEach(() => {
      store = mockStore({ results: [] });
    });

    it(`should create ${actionTypes.GET_SEARCH_RESULTS_SUCCESS} after fetching search results`, async () => {
      const mockResponse = [{ subject: 'EECS' }];
      fetchMock.get(searchURL(query), mockResponse);

      await store.dispatch(actionCreators.fetchSearchResults(query));
      expect(store.getActions()).toEqual([
        actionCreators.getSearchResultsRequest(),
        actionCreators.getSearchResultsSuccess(mockResponse),
      ]);
    });

    it(`should create ${actionTypes.GET_SEARCH_RESULTS_FAILURE} on fetching search result failure`, async () => {
      fetchMock.get(searchURL(query), { throws: new TypeError('Failed to fetch') });

      await store.dispatch(actionCreators.fetchSearchResults(query));
      expect(store.getActions()).toEqual([
        actionCreators.getSearchResultsRequest(),
        actionCreators.getSearchResultsFailure(),
      ]);
    });
  });

  describe('fetchSections', () => {
    let store;
    const course = ['4720', 'MEAS', 'EECS', '101-0'];

    beforeEach(() => {
      store = mockStore({ currentSections: [] });
    });

    it(`should create ${actionTypes.GET_SECTIONS_SUCCESS} after fetching sections`, async () => {
      const mockResponse = [{ id: '12345', section: '20' }];
      fetchMock.get(sectionsURL(...course), mockResponse);

      await store.dispatch(actionCreators.fetchSections(...course));
      expect(store.getActions()).toEqual([
        actionCreators.getSectionsRequest(),
        actionCreators.getSectionsSuccess(mockResponse),
      ]);
    });

    it(`should create ${actionTypes.GET_SECTIONS_FAILURE} on fetching sections failure`, async () => {
      fetchMock.get(sectionsURL(...course), { throws: new TypeError('Failed to fetch') });

      await store.dispatch(actionCreators.fetchSections(...course));
      expect(store.getActions()).toEqual([
        actionCreators.getSectionsRequest(),
        actionCreators.getSectionsFailure(),
      ]);
    });
  });
});
