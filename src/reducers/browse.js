import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { getSchoolsSuccess, getSchoolsFailure } from 'actions';
import { fetchSchools } from 'effects/browse';
import * as actionTypes from '../actions/action-types';

export const initialBrowseState = fromJS({
  isFetching: false,
  schools: [],
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
    default:
      return state;
  }
}

export default browse;
