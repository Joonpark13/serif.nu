import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
import scheduleReducer, { initialScheduleState } from './schedule';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';
import * as getNextColor from './add-section-handler-helpers/get-next-color';
import * as splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import * as assignConflictInfo from './add-section-handler-helpers/assign-conflict-info';

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const color = classColors[0];
    getNextColor.default = jest.fn().mockReturnValue(color);
    splitBySchedules.default = jest.fn(section => fromJS([section]));
    assignConflictInfo.default = jest.fn(sections => sections);
    const section = {
      id: 12345,
      section: '20',
    };
    const action = actionCreators.addSection(section);

    const sectionWithColor = Object.assign({}, section, { color });
    expect(
      scheduleReducer(initialScheduleState, action),
    ).toEqual(
      initialScheduleState
        .update('sections', sections => sections.push(fromJS(sectionWithColor)))
        .update('colorUses', colorUses => colorUses.set(color, 1)),
    );
  });
});
