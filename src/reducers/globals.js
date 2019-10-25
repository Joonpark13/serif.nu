import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import * as actionTypes from 'actions/action-types';
import {
  fetchCurrentTermSuccess,
  fetchCurrentTermFailure,
  fetchSchoolsRequest,
  fetchSearchIndex,
} from 'actions';
import { fetchCurrentTerm } from 'effects/globals';

export const initialGlobalsState = fromJS({
  isFetching: false,
  currentTerm: '',
});

function globals(state = initialGlobalsState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_TERM_REQUEST:
      return loop(
        state.set('isFetching', true),
        Cmd.run(fetchCurrentTerm, {
          successActionCreator: fetchCurrentTermSuccess,
          failActionCreator: fetchCurrentTermFailure,
        }),
      );
    case actionTypes.FETCH_CURRENT_TERM_SUCCESS:
      return loop(
        state
          .set('isFetching', false)
          .set('currentTerm', fromJS({
            id: action.term[0].id,
            name: action.term[0].name,
          })),
        Cmd.list([
          Cmd.action(fetchSchoolsRequest()),
          Cmd.action(fetchSearchIndex()),
        ]),
      );
    case actionTypes.FETCH_CURRENT_TERM_FAILURE:
      return state.set('isFetching', false); // TODO: Handle error
    default:
      return state;
  }
}

export default globals;
