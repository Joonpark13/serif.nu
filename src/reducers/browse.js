import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { getSchoolsSuccess, getSchoolsFailure, fetchSubjectsSuccess, fetchSubjectsFailure } from 'actions';
import * as actionTypes from '../actions/action-types';
import { fetchSubjects, fetchSchools } from '../effects/browse';

export const initialBrowseState = fromJS({
  isFetching: false,
  schools: [],
  subjects: [],
  currentBrowseLevel: 'schools',
});

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
      return state.set('isFetching', false)
        .set('schools', fromJS(action.schools));
    case actionTypes.GET_SCHOOLS_FAILURE:
      return state.set('isFetching', false)
        .set('schools', initialBrowseState.get('schools'));

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
      return state.set('isFetching', false)
        .set('subjects', fromJS(action.subjects));
    case actionTypes.FETCH_SUBJECTS_FAILURE:
      return state.set('isFetching', false)
        .set('subjects', initialBrowseState.get('subjects'));
    default:
      return state;

    case actionTypes.CHANGE_BROWSE_LEVEL:
      return state.set('currentBrowseLevel', action.browseLevel);
  }
}

export default browse;
