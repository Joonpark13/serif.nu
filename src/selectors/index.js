import { meetsDuringDow, meetsDuringHour } from 'util/time';

function getMatchingClasses(classes, hour, dow) {
  return classes.filter(
    (sectionOrAssociatedClass) => {
      const eventObj = sectionOrAssociatedClass.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

function findMatchingClass(classes, hour, dow) {
  return classes.find(
    (sectionOrAssociatedClass) => {
      const eventObj = sectionOrAssociatedClass.get('event').toJS();
      return meetsDuringDow(eventObj, dow) && meetsDuringHour(eventObj, hour);
    },
  );
}

// Schedule
export function sectionsSelector(state) {
  return state.getIn(['schedule', 'sections']);
}

export function associatedClassSelector(state) {
  return state.getIn(['schedule', 'associatedClasses']);
}

export function sectionsForHourSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sections']);
  return getMatchingClasses(allSections, hour, dow);
}

export function associatedClassesForHourSelector(state, hour, dow) {
  const allAssociatedClasses = state.getIn(['schedule', 'associatedClasses']);
  return getMatchingClasses(allAssociatedClasses, hour, dow);
}

export function sectionPreviewSelector(state, hour, dow) {
  const allSections = state.getIn(['schedule', 'sectionPreview']);
  return findMatchingClass(allSections, hour, dow);
}

export function associatedClassPreviewSelector(state, hour, dow) {
  const allAssociatedClasses = state.getIn(['schedule', 'associatedClassPreview']);
  return findMatchingClass(allAssociatedClasses, hour, dow);
}

export function allSectionPreviewsSelector(state) {
  return state.getIn(['schedule', 'sectionPreview']);
}

// Browse
export function currentBrowseLevelSelector(state) {
  return state.getIn(['browse', 'currentBrowseLevel']);
}

export function browseIsFetchingSelector(state) {
  return state.getIn(['browse', 'isFetching']);
}

export function selectedCourseNameSelector(state) {
  return state.getIn(['browse', 'selected', 'course', 'name']);
}

export function selectedSectionNumberSelector(state) {
  return state.getIn(['browse', 'selected', 'section', 'sectionNumber']);
}

export function selectedSectionAssociatedClassesSelector(state) {
  return state.getIn(['browse', 'selected', 'section', 'associatedClasses']);
}

export function selectedSchoolIdSelector(state) {
  return state.getIn(['browse', 'selected', 'school', 'id']);
}

export function selectedSubjectIdSelector(state) {
  return state.getIn(['browse', 'selected', 'subject', 'id']);
}

export function browseSectionsSelector(state) {
  return state.getIn(['browse', 'sections']);
}

export function coursesSelector(state) {
  return state
    .getIn(['browse', 'courses'])
    .sortBy(course => `${course.get('id')} ${course.get('name')}`);
}

export function schoolsSelector(state) {
  return state.getIn(['browse', 'schools']).sortBy(school => school.get('name'));
}

export function subjectsSelector(state) {
  return state
    .getIn(['browse', 'subjects'])
    .sortBy(subject => `${subject.get('id')} - ${subject.get('name')}`);
}

// Search
export function searchIsFetchingSelector(state) {
  return state.getIn(['search', 'isFetching']);
}

export function currentCourseNameSelector(state) {
  return state.getIn(['search', 'currentCourseName']);
}

export function currentSectionNumberSelector(state) {
  return state.getIn(['search', 'currentSectionNumber']);
}

export function currentAssociatedClassesSelector(state) {
  return state.getIn(['search', 'currentAssociatedClasses']);
}

export function currentSearchInputSelector(state) {
  return state.getIn(['search', 'currentSearchInput']);
}

export function searchViewSelector(state) {
  return state.getIn(['search', 'view']);
}

export function searchResultsSelector(state) {
  return state.getIn(['search', 'results']);
}

export function currentSectionsSelector(state) {
  return state.getIn(['search', 'currentSections']);
}

// Globals
export function currentTermSelector(state) {
  return state.getIn(['globals', 'currentTerm']);
}
