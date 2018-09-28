import { fromJS } from 'immutable';
import { search as searchReducer, initialSearchState } from './index';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('search', () => {
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
      isFetching: true,
      results: [],
    });
    const action = actionCreators.getSearchResultsFailure();
    expect(searchReducer(state, action)).toEqual(fromJS({
      isFetching: false,
      results: [],
    }));
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
});
