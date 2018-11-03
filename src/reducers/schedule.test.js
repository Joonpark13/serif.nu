import { fromJS } from 'immutable';
import scheduleReducer, { initialScheduleState } from './schedule';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const section = { id: 12345, section: '20' };
    const action = actionCreators.addSection(section);

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(initialScheduleState.set('sections', initialScheduleState.get('sections').push(fromJS(section))));
  });
});
