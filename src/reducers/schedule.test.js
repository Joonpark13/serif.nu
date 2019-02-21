import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
import scheduleReducer, { initialScheduleState } from './schedule';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const section = {
      id: 12345,
      section: '20',
    };
    const action = actionCreators.addSection(section);

    const sectionWithColor = Object.assign({}, section, { color: classColors[0] });
    expect(scheduleReducer(initialScheduleState, action)).toEqual(
      initialScheduleState.update('sections', sections => sections.push(fromJS(sectionWithColor))),
    );
  });
});
