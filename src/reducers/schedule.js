import { fromJS } from 'immutable';
import * as actionTypes from '../actions/action-types';

export const initialScheduleState = fromJS({
  sections: [],
});

function schedule(state = initialScheduleState, action) {
  switch (action.type) {
    case actionTypes.ADD_SECTION:
      return state.set('sections', state.get('sections').push(fromJS(action.section)));
    default:
      return state;
  }
}

export default schedule;
