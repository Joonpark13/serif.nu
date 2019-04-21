import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { getSchoolsSuccess, getSchoolsFailure, fetchSubjectsSuccess, fetchSubjectsFailure } from 'actions';
import * as actionTypes from '../actions/action-types';
import { fetchSubjects, fetchSchools } from '../effects/browse';

const BROWSE_LEVEL_HIERARCHY = ['school', 'subject', 'course', 'section', 'associatedClass'];

export const initialBrowseState = fromJS({
  isFetching: false,
  schools: [],
  subjects: [],
  currentBrowseLevel: 'school',
  selected: {
    school: null,
    subject: null,
    course: null,
  },
});

function handleChangeBrowseLevel(state, { browseLevel }) {
  const currentBrowseLevel = state.get('currentBrowseLevel');
  const currentBrowseLevelIndex = BROWSE_LEVEL_HIERARCHY.indexOf(currentBrowseLevel);
  const nextBrowseLevel = browseLevel;
  const nextBrowseLevelIndex = BROWSE_LEVEL_HIERARCHY.indexOf(nextBrowseLevel);
  let newState = state;

  // If a user goes "back", we should clear selected state
  if (nextBrowseLevelIndex < currentBrowseLevelIndex) {
    for (let i = nextBrowseLevelIndex; i < currentBrowseLevelIndex; i++) {
      newState = newState.setIn(['selected', BROWSE_LEVEL_HIERARCHY[i]], null);
    }
  }
  return newState.set('currentBrowseLevel', browseLevel);
}

function browse(state = initialBrowseState, action) {
  switch (action.type) {
    case actionTypes.GET_SCHOOLS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSchools, {
          successActionCreator: getSchoolsSuccess,
          failActionCreator: getSchoolsFailure,
        }),
      );
    case actionTypes.GET_SCHOOLS_SUCCESS:
      return state.merge({
        isFetching: false,
        schools: fromJS(action.schools),
      });
    case actionTypes.GET_SCHOOLS_FAILURE:
      return state.merge({
        isFetching: false,
        schools: initialBrowseState.get('schools'),
      });

    case actionTypes.FETCH_SUBJECTS_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchSubjects, {
          args: [action.schoolId],
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
    default:
      return state;

    case actionTypes.CHANGE_BROWSE_LEVEL:
      return handleChangeBrowseLevel(state, action);

    case actionTypes.SELECT_SCHOOL_IN_BROWSE:
      return state.setIn(
        ['selected', 'school'],
        state.get('schools').find(school => school.get('id') === action.schoolId),
      );
  }
}

export default browse;
