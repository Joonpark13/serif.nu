import * as actionTypes from './action-types';

export function fetchSearchIndex(termId) {
  return {
    type: actionTypes.FETCH_SEARCH_INDEX,
    termId,
  };
}

export function fetchSearchIndexSuccess(searchIndex) {
  return {
    type: actionTypes.FETCH_SEARCH_INDEX_SUCCESS,
    searchIndex,
  };
}

export function fetchSearchIndexFailure() {
  return {
    type: actionTypes.FETCH_SEARCH_INDEX_FAILURE,
  };
}

export const clearSearchResults = () => ({
  type: actionTypes.CLEAR_SEARCH_RESULTS,
});

export function getSectionsRequest(termId, schoolId, subjectId, courseId) {
  return {
    type: actionTypes.GET_SECTIONS_REQUEST,
    termId,
    schoolId,
    subjectId,
    courseId,
  };
}

export const getSectionsSuccess = sections => ({
  type: actionTypes.GET_SECTIONS_SUCCESS,
  sections,
});

export const getSectionsFailure = () => ({
  type: actionTypes.GET_SECTIONS_FAILURE,
});

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

export const removeSection = (sectionId, sectionColor) => ({
  type: actionTypes.REMOVE_SECTION,
  sectionId,
  sectionColor,
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

export const getSearchResultsRequest = searchInput => ({
  type: actionTypes.GET_SEARCH_RESULTS_REQUEST,
  searchInput,
});

export const getSearchResultsSuccess = searchResults => ({
  type: actionTypes.GET_SEARCH_RESULTS_SUCCESS,
  searchResults,
});

export const getSearchResultsFailure = () => ({
  type: actionTypes.GET_SEARCH_RESULTS_FAILURE,
});

export const updateSearchInput = searchInput => ({
  type: actionTypes.UPDATE_SEARCH_INPUT,
  searchInput,
});

export const fetchSubjectsRequest = schoolId => ({
  type: actionTypes.FETCH_SUBJECTS_REQUEST,
  schoolId,
});

export const fetchSubjectsSuccess = subjects => ({
  type: actionTypes.FETCH_SUBJECTS_SUCCESS,
  subjects,
});

export const fetchSubjectsFailure = () => ({
  type: actionTypes.FETCH_SUBJECTS_FAILURE,
});

export function fetchCoursesRequest(schoolId, subjectId) {
  return {
    type: actionTypes.FETCH_COURSES_REQUEST,
    schoolId,
    subjectId,
  };
}

export function fetchCoursesSuccess(courses) {
  return {
    type: actionTypes.FETCH_COURSES_SUCCESS,
    courses,
  };
}

export function fetchCoursesFailure() {
  return {
    type: actionTypes.FETCH_COURSES_FAILURE,
  };
}

export function changeBrowseLevel(browseLevel) {
  return {
    type: actionTypes.CHANGE_BROWSE_LEVEL,
    browseLevel,
  };
}

export function viewSectionSelection() {
  return {
    type: actionTypes.VIEW_SECTION_SELECTION,
  };
}

export function addSectionWithAssociatedClass(associatedClass) {
  return {
    type: actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS,
    associatedClass,
  };
}

export function selectSchoolInBrowse(schoolId) {
  return {
    type: actionTypes.SELECT_SCHOOL_IN_BROWSE,
    schoolId,
  };
}

export function selectSubjectInBrowse(subjectId) {
  return {
    type: actionTypes.SELECT_SUBJECT_IN_BROWSE,
    subjectId,
  };
}
