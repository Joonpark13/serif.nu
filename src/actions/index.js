import 'whatwg-fetch';
import * as actionTypes from './action-types';
import { searchURL } from '../util/api';
import prodMode from '../util/env';

export const getSearchResultsRequest = () => ({
  type: actionTypes.GET_SEARCH_RESULTS_REQUEST,
});

export const getSearchResultsSuccess = searchResults => ({
  type: actionTypes.GET_SEARCH_RESULTS_SUCCESS,
  searchResults,
});

export const getSearchResultsFailure = () => ({
  type: actionTypes.GET_SEARCH_RESULTS_FAILURE,
});

export const fetchSearchResults = searchInput => (dispatch) => {
  dispatch(getSearchResultsRequest());
  return fetch(searchURL(searchInput))
    .then(response => response.json())
    .then(json => dispatch(getSearchResultsSuccess(json)))
    .catch((error) => {
      /* istanbul ignore next */
      if (!prodMode) console.log(error);
      dispatch(getSearchResultsFailure());
    });
};
