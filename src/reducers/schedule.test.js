import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
import scheduleReducer, { initialScheduleState } from './schedule';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';
import * as getNextColor from './add-section-handler-helpers/get-next-color';
import * as splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import * as assignConflictInfo from './add-section-handler-helpers/assign-conflict-info';
import * as assignColor from './add-section-handler-helpers/assign-color';

jest.mock('./add-section-handler-helpers/assign-conflict-info');
jest.mock('./add-section-handler-helpers/assign-color');

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const color = classColors[0];
    getNextColor.default = jest.fn().mockReturnValue(color);
    splitBySchedules.default = jest.fn(section => fromJS([section]));
    const section = {
      id: '12345',
      section: '20',
    };
    const sectionWithColor = Object.assign({}, section, { color });
    assignColor.default.mockReturnValue(fromJS([sectionWithColor]));
    const action = actionCreators.addSection(section);

    expect(
      scheduleReducer(initialScheduleState, action),
    ).toEqual(
      initialScheduleState
        .update('sections', sections => sections.push(fromJS(sectionWithColor)))
        .update('colorUses', colorUses => colorUses.set(color, 1)),
    );
  });

  it(`should handle ${actionTypes.REMOVE_SECTION}`, () => {
    const colorOne = classColors[0];
    const colorTwo = classColors[1];
    const scheduleWithSectionsState = fromJS({
      sections: [
        {
          id: '12345',
          section: '20',
          color: colorOne,
        },
        {
          id: '12345',
          section: '20',
          color: colorOne,
        },
        {
          id: '54321',
          section: '40',
          color: colorTwo,
        },
      ],
      associatedClasses: [],
      colorUses: { [colorOne]: 1, [colorTwo]: 1 },
    });
    const action = actionCreators.removeSection('12345', colorOne);

    expect(
      scheduleReducer(scheduleWithSectionsState, action),
    ).toEqual(
      scheduleWithSectionsState
        .update('sections', sections => sections.filter(
          section => section.get('id') !== '12345',
        ))
        .update('colorUses', colorUses => colorUses.set(colorOne, 0)),
    );
  });

  it(`should handle ${actionTypes.REMOVE_SECTION} with associated classes`, () => {
    const color = classColors[0];
    const sectionId = '12345';
    const state = fromJS({
      sections: [{ id: sectionId }],
      associatedClasses: [{ sectionId }],
      colorUses: { [color]: 1 },
    });
    const action = actionCreators.removeSection(sectionId, color);

    expect(
      scheduleReducer(state, action).get('associatedClasses'),
    ).toEqual(fromJS([]));
  });

  it(`should handle ${actionTypes.ADD_SECTION} when section has associated classes`, () => {
    const section = {
      id: '12345',
      section: '20',
      associatedClasses: [{}],
    };
    const sections = fromJS([section]);
    assignConflictInfo.default.mockReturnValue(sections);
    const action = actionCreators.addSection(section);

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(initialScheduleState.merge({
        sectionPreview: sections,
        sections: [],
      }));
  });

  it(`should handle ${actionTypes.VIEW_SECTION_SELECTION}`, () => {
    const action = actionCreators.viewSectionSelection({});
    expect(scheduleReducer(initialScheduleState, action)).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS}`, () => {
    const color = classColors[0];
    const sections = fromJS([{ id: '12345' }]);
    const associatedClass = {
      schedule: {
        dow: ['Mo'],
      },
    };
    const associatedClasses = fromJS([associatedClass]);
    assignColor.default.mockReturnValueOnce(sections).mockReturnValueOnce(associatedClasses);

    const action = actionCreators.addSectionWithAssociatedClass(associatedClass);

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(initialScheduleState.merge({
        sections,
        associatedClasses,
        colorUses: initialScheduleState.get('colorUses').set(color, 1),
      }));
  });
});
