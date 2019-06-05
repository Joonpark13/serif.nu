// Schedule
export function sectionsSelector(state) {
  return state.getIn(['schedule', 'sections']);
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
