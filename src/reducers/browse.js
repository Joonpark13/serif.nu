import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { isUnscheduled } from 'util/time';
import {
  fetchSchoolsSuccess,
  fetchSchoolsFailure,
  fetchSubjectsSuccess,
  fetchSubjectsFailure,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchSectionsForBrowseSuccess,
  fetchSectionsForBrowseFailure,
} from 'actions';
import * as actionTypes from 'actions/action-types';
import { fetchSubjects, fetchSchools, fetchCourses } from 'effects/browse';
import { fetchSections } from 'effects/common';

const BROWSE_LEVEL_HIERARCHY = ['school', 'subject', 'course', 'section', 'associatedClass'];
const BROWSE_LEVEL_DATA_KEYS = ['schools', 'subjects', 'courses', 'sections', 'associatedClasses'];

export const initialBrowseState = fromJS({
  isFetching: false,
  schools: [],
  subjects: [],
  courses: [],
  sections: [],
  currentBrowseLevel: 'school',
  selected: {
    school: null,
    subject: null,
    course: null,
    section: null,
  },
});

function handleChangeBrowseLevel(state, { browseLevel }) {
  const currentBrowseLevel = state.get('currentBrowseLevel');
  const currentBrowseLevelIndex = BROWSE_LEVEL_HIERARCHY.indexOf(currentBrowseLevel);
  const nextBrowseLevel = browseLevel;
  const nextBrowseLevelIndex = BROWSE_LEVEL_HIERARCHY.indexOf(nextBrowseLevel);
  let newState = state;

  // If a user goes "back", we should clear selected state and data
  if (nextBrowseLevelIndex < currentBrowseLevelIndex) {
    for (let i = nextBrowseLevelIndex; i < currentBrowseLevelIndex; i++) {
      newState = newState.setIn(['selected', BROWSE_LEVEL_HIERARCHY[i]], null);
    }

    for (let i = nextBrowseLevelIndex + 1; i <= currentBrowseLevelIndex; i++) {
      newState = newState.set(BROWSE_LEVEL_DATA_KEYS[i], fromJS([]));
    }
  }
  return newState.set('currentBrowseLevel', browseLevel);
}

function handleAddSectionFromBrowse(state, { section }) {
  const canScheduleAnAssociatedClass = section.associatedClasses
    && section.associatedClasses.some(
      associatedClass => !isUnscheduled(associatedClass.schedule),
    );

  if (canScheduleAnAssociatedClass) {
    return state
      .set('currentBrowseLevel', 'associatedClass')
      .update('selected', selected => selected.set('section', fromJS(section)));
  }
  return initialBrowseState.set('schools', state.get('schools'));
}

function browse(state = initialBrowseState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SCHOOLS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSchools, {
          args: [action.currentTermId],
          successActionCreator: fetchSchoolsSuccess,
          failActionCreator: fetchSchoolsFailure,
        }),

      );
    case actionTypes.FETCH_SCHOOLS_SUCCESS:
      return state.merge({
        isFetching: false,
        schools: fromJS(action.schools),
      });
    case actionTypes.FETCH_SCHOOLS_FAILURE:
      return state.merge({
        isFetching: false,
        schools: initialBrowseState.get('schools'),
      });

    case actionTypes.FETCH_SUBJECTS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSubjects, {
          args: [action.currentTermId, action.schoolId],
          successActionCreator: fetchSubjectsSuccess,
          failActionCreator: fetchSubjectsFailure,
        }),
      );
    case actionTypes.FETCH_SUBJECTS_SUCCESS:
      return state.merge({
        isFetching: false,
        subjects: fromJS(action.subjects),
      });
    case actionTypes.FETCH_SUBJECTS_FAILURE:
      return state.merge({
        isFetching: false,
        subjects: initialBrowseState.get('subjects'),
      });

    case actionTypes.FETCH_COURSES_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchCourses, {
          args: [action.currentTermId, action.schoolId, action.subjectId],
          successActionCreator: fetchCoursesSuccess,
          failActionCreator: fetchCoursesFailure,
        }),
      );
    case actionTypes.FETCH_COURSES_SUCCESS:
      return state.merge({
        isFetching: false,
        courses: fromJS(action.courses),
      });
    case actionTypes.FETCH_COURSES_FAILURE:
      return state.merge({
        isFetching: false,
        courses: initialBrowseState.get('courses'),
      });

    case actionTypes.FETCH_SECTIONS_FOR_BROWSE_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSections, {
          args: [action.currentTermId, action.schoolId, action.subjectId, action.courseId],
          successActionCreator: fetchSectionsForBrowseSuccess,
          failActionCreator: fetchSectionsForBrowseFailure,
        }),
      );
    case actionTypes.FETCH_SECTIONS_FOR_BROWSE_SUCCESS:
      return state.merge({
        isFetching: false,
        sections: fromJS(action.sections),
      });
    case actionTypes.FETCH_SECTIONS_FOR_BROWSE_FAILURE:
      return state.merge({
        isFetching: false,
        sections: initialBrowseState.get('sections'),
      });

    case actionTypes.CHANGE_BROWSE_LEVEL:
      return handleChangeBrowseLevel(state, action);

    case actionTypes.SELECT_SCHOOL_IN_BROWSE:
      return state.setIn(
        ['selected', 'school'],
        state.get('schools').find(school => school.get('id') === action.schoolId),
      );
    case actionTypes.SELECT_SUBJECT_IN_BROWSE:
      return state.setIn(
        ['selected', 'subject'],
        state.get('subjects').find(subject => subject.get('id') === action.subjectId),
      );
    case actionTypes.SELECT_COURSE_IN_BROWSE:
      return state.setIn(
        ['selected', 'course'],
        state.get('courses').find(course => course.get('id') === action.courseId),
      );

    case actionTypes.ADD_SECTION_FROM_BROWSE:
      return handleAddSectionFromBrowse(state, action);
    case actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_BROWSE:
      return initialBrowseState.set('schools', state.get('schools'));

    default:
      return state;
  }
}

export default browse;
