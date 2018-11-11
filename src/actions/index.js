import 'whatwg-fetch';
import * as actionTypes from './action-types';
import { searchURL, sectionsURL, schoolsURL } from '../util/api';
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

export const clearSearchResults = () => ({
  type: actionTypes.CLEAR_SEARCH_RESULTS,
});

export const getSectionsRequest = () => ({
  type: actionTypes.GET_SECTIONS_REQUEST,
});

export const getSectionsSuccess = sections => ({
  type: actionTypes.GET_SECTIONS_SUCCESS,
  sections,
});

export const getSectionsFailure = () => ({
  type: actionTypes.GET_SECTIONS_FAILURE,
});

export const fetchSections = (termId, schoolAbbv, subjectAbbv, courseAbbv) => (dispatch) => {
  dispatch(getSectionsRequest());
  return fetch(sectionsURL(termId, schoolAbbv, subjectAbbv, courseAbbv))
    .then(response => response.json())
    .then(json => dispatch(getSectionsSuccess(json)))
    .catch((error) => {
      /* istanbul ignore next */
      if (!prodMode) console.log(error);
      dispatch(getSectionsFailure());
    });
};

export const setCurrentCourseName = courseName => ({
  type: actionTypes.SET_CURRENT_COURSE_NAME,
  courseName,
});

export const viewSearch = () => ({
  type: actionTypes.VIEW_SEARCH,
});

export const addSection = section => ({
  type: actionTypes.ADD_SECTION,
  section,
});

export const getSchoolsRequest = () => ({
  type: actionTypes.GET_SCHOOLS_REQUEST,
});

export const getSchoolsSuccess = schools => ({
  type: actionTypes.GET_SCHOOLS_SUCCESS,
  schools,
});

export const getSchoolsFailure = () => ({
  type: actionTypes.GET_SCHOOLS_FAILURE,
});

export const fetchSchools = termId => (dispatch) => {
  dispatch(getSchoolsRequest());
  return fetch(schoolsURL(termId))
    .then(response => response.json())
    .then(json => dispatch(getSchoolsSuccess(json)))
    .catch((error) => {
      /* istanbul ignore next */
      if (!prodMode) console.log(error);
      dispatch(getSchoolsFailure());
    });
};
