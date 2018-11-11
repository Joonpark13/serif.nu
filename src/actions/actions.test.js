import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actionTypes from './action-types';
import * as actionCreators from './index';
import { searchURL, sectionsURL, schoolsURL } from '../util/api';

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

  describe('addSection', () => {
    it(`should create a ${actionTypes.ADD_SECTION}`, () => {
      const section = { section: '20', id: 12345 };
      expect(actionCreators.addSection(section)).toEqual({
        type: actionTypes.ADD_SECTION,
        section,
      });
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

  describe('fetchSchools', () => {
    let store;
    const termId = '4720';

    beforeEach(() => {
      store = mockStore({ schools: [] });
    });

    it(`should create ${actionTypes.GET_SCHOOLS_SUCCESS} after fetching schools`, async () => {
      const mockResponse = [
        { _id: '5bab37ef1080c00004622388', id: 'MUSIC', name: 'Bienen School of Music', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c00004622389', id: 'LAW', name: 'Law School', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238a', id: 'MEAS', name: 'McCormick School of Engineering and Applied Science', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238b', id: 'JOUR', name: 'Medill School of Journalism', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238c', id: 'DOHA', name: 'Northwestern in Qatar', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238d', id: 'SoC', name: 'School of Communication', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238e', id: 'SESP', name: 'School of Educ & Social Policy', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c0000462238f', id: 'SCS', name: 'School of Professional Studies', term: '4720', type: 'school' },
        { _id: '5bab37ef1080c00004622390', id: 'WCAS', name: 'Weinberg College of Arts and Sciences', term: '4720', type: 'school' },
      ];
      fetchMock.get(schoolsURL(termId), mockResponse);

      await store.dispatch(actionCreators.fetchSchools(termId));
      expect(store.getActions()).toEqual([
        actionCreators.getSchoolsRequest(),
        actionCreators.getSchoolsSuccess(mockResponse),
      ]);
    });

    it(`should create ${actionTypes.GET_SCHOOLS_FAILURE} on fetching schools failure`, async () => {
      fetchMock.get(schoolsURL(termId), { throws: new TypeError('Failed to fetch') });

      await store.dispatch(actionCreators.fetchSchools(termId));
      expect(store.getActions()).toEqual([
        actionCreators.getSchoolsRequest(),
        actionCreators.getSchoolsFailure(),
      ]);
    });
  });
});
