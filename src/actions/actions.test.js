import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actionTypes from './action-types';
import * as actionCreators from './index';
import { searchURL } from '../util/api';

describe('action creators', () => {
  describe('getSearchResultsRequest', () => {
    it('should create a getSearchResultsRequest', () => {
      expect(actionCreators.getSearchResultsRequest())
        .toEqual({ type: actionTypes.GET_SEARCH_RESULTS_REQUEST });
    });
  });

  describe('getSearchResultsSuccess', () => {
    it('should create a getSearchResultsSuccess', () => {
      const searchResults = { subject: 'EECS' };
      expect(actionCreators.getSearchResultsSuccess(searchResults))
        .toEqual({
          type: actionTypes.GET_SEARCH_RESULTS_SUCCESS,
          searchResults,
        });
    });
  });

  describe('getSearchResultsFailure', () => {
    it('should create a getSearchResultsFailure', () => {
      expect(actionCreators.getSearchResultsFailure())
        .toEqual({ type: actionTypes.GET_SEARCH_RESULTS_FAILURE });
    });
  });

  describe('clearSearchResults', () => {
    it('should create a getSearchResults', () => {
      expect(actionCreators.clearSearchResults())
        .toEqual({ type: actionTypes.CLEAR_SEARCH_RESULTS });
    });
  });
});

describe('async action creators', () => {
  describe('fetchSearchResults', () => {
    const mockStore = configureMockStore([thunk]);
    let store;
    const query = 'EECS';

    beforeEach(() => {
      store = mockStore({ results: [] });
    });

    afterEach(() => {
      fetchMock.reset();
    });

    it(`creates ${actionTypes.GET_SEARCH_RESULTS_SUCCESS} after fetching search results`, async () => {
      const mockResponse = [{ subject: 'EECS' }];
      fetchMock.get(searchURL(query), mockResponse);

      await store.dispatch(actionCreators.fetchSearchResults(query));
      expect(store.getActions()).toEqual([
        actionCreators.getSearchResultsRequest(),
        actionCreators.getSearchResultsSuccess(mockResponse),
      ]);
    });

    it(`creates ${actionTypes.GET_SEARCH_RESULTS_FAILURE} on fetching search result failure`, async () => {
      fetchMock.get(searchURL(query), { throws: new TypeError('Failed to fetch') });
      await store.dispatch(actionCreators.fetchSearchResults(query));
      expect(store.getActions()).toEqual([
        actionCreators.getSearchResultsRequest(),
        actionCreators.getSearchResultsFailure(),
      ]);
    });
  });
});
