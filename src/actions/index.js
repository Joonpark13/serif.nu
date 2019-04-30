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

export function fetchSectionsForSearchRequest(schoolId, subjectId, courseId) {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_SEARCH_REQUEST,
    schoolId,
    subjectId,
    courseId,
  };
}

export function fetchSectionsForSearchSuccess(sections) {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_SEARCH_SUCCESS,
    sections,
  };
}

export function fetchSectionsForSearchFailure() {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_SEARCH_FAILURE,
  };
}

export const setCurrentCourseName = courseName => ({
  type: actionTypes.SET_CURRENT_COURSE_NAME,
  courseName,
});

export const viewSearch = () => ({
  type: actionTypes.VIEW_SEARCH,
});

export function addSectionFromSearch(section) {
  return {
    type: actionTypes.ADD_SECTION_FROM_SEARCH,
    section,
  };
}

export function addSectionWithAssociatedClassFromSearch(associatedClass) {
  return {
    type: actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_SEARCH,
    associatedClass,
  };
}

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

export function fetchSectionsForBrowseRequest(schoolId, subjectId, courseId) {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_BROWSE_REQUEST,
    schoolId,
    subjectId,
    courseId,
  };
}

export function fetchSectionsForBrowseSuccess(sections) {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_BROWSE_SUCCESS,
    sections,
  };
}

export function fetchSectionsForBrowseFailure() {
  return {
    type: actionTypes.FETCH_SECTIONS_FOR_BROWSE_FAILURE,
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

export function selectCourseInBrowse(courseId) {
  return {
    type: actionTypes.SELECT_COURSE_IN_BROWSE,
    courseId,
  };
}

export function addSectionFromBrowse(section) {
  return {
    type: actionTypes.ADD_SECTION_FROM_BROWSE,
    section,
  };
}

export function addSectionWithAssociatedClassFromBrowse(associatedClass) {
  return {
    type: actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_BROWSE,
    associatedClass,
  };
}

export function sectionHover(section) {
  return {
    type: actionTypes.SECTION_HOVER,
    section,
  };
}

export function sectionHoverOff() {
  return {
    type: actionTypes.SECTION_HOVER_OFF,
  };
}

export function associatedClassHover(associatedClass) {
  return {
    type: actionTypes.ASSOCIATED_CLASS_HOVER,
    associatedClass,
  };
}

export function associatedClassHoverOff() {
  return {
    type: actionTypes.ASSOCIATED_CLASS_HOVER_OFF,
  };
}
