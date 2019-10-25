import * as actionTypes from './action-types';
import { ENHANCE_WITH_CURRENT_TERM_ID } from './action-enhancers';

export function fetchSearchIndex() {
  return {
    type: actionTypes.FETCH_SEARCH_INDEX,
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
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
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
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

export function viewSearch() {
  return {
    type: actionTypes.VIEW_SEARCH,
  };
}

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

export const removeAllClasses = () => ({
  type: actionTypes.REMOVE_ALL_CLASSES,
});

export function fetchSchoolsRequest() {
  return {
    type: actionTypes.FETCH_SCHOOLS_REQUEST,
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
  };
}

export function fetchSchoolsSuccess(schools) {
  return {
    type: actionTypes.FETCH_SCHOOLS_SUCCESS,
    schools,
  };
}

export function fetchSchoolsFailure() {
  return {
    type: actionTypes.FETCH_SCHOOLS_FAILURE,
  };
}

export function fetchSearchResultsRequest(searchInput) {
  return {
    type: actionTypes.FETCH_SEARCH_RESULTS_REQUEST,
    searchInput,
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
  };
}

export function fetchSearchResultsSuccess(searchResults) {
  return {
    type: actionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
    searchResults,
  };
}

export function fetchSearchResultsFailure() {
  return {
    type: actionTypes.FETCH_SEARCH_RESULTS_FAILURE,
  };
}

export function updateSearchInput(searchInput) {
  return {
    type: actionTypes.UPDATE_SEARCH_INPUT,
    searchInput,
  };
}

export function fetchSubjectsRequest(schoolId) {
  return {
    type: actionTypes.FETCH_SUBJECTS_REQUEST,
    schoolId,
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
  };
}

export function fetchSubjectsSuccess(subjects) {
  return {
    type: actionTypes.FETCH_SUBJECTS_SUCCESS,
    subjects,
  };
}

export function fetchSubjectsFailure() {
  return {
    type: actionTypes.FETCH_SUBJECTS_FAILURE,
  };
}

export function fetchCoursesRequest(schoolId, subjectId) {
  return {
    type: actionTypes.FETCH_COURSES_REQUEST,
    schoolId,
    subjectId,
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
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
    [ENHANCE_WITH_CURRENT_TERM_ID]: true,
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

export function fetchCurrentTermRequest() {
  return {
    type: actionTypes.FETCH_CURRENT_TERM_REQUEST,
  };
}

export function fetchCurrentTermSuccess(term) {
  return {
    type: actionTypes.FETCH_CURRENT_TERM_SUCCESS,
    term,
  };
}

export function fetchCurrentTermFailure() {
  return {
    type: actionTypes.FETCH_CURRENT_TERM_FAILURE,
  };
}
