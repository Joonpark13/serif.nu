import { fromJS } from 'immutable';
import { classColors, northwesternPurple30 } from 'util/colors';
import * as timeUtils from 'util/time';
import scheduleReducer, { initialScheduleState } from './schedule';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';
import * as getNextColor from './add-section-handler-helpers/get-next-color';
import * as splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import * as prepClassesForCalendar from './add-section-handler-helpers/prep-classes-for-calendar';

jest.mock('./add-section-handler-helpers/assign-color');
jest.mock('./add-section-handler-helpers/split-by-schedules');
jest.mock('./add-section-handler-helpers/prep-classes-for-calendar');
jest.mock('./add-section-handler-helpers/get-next-color');
jest.mock('util/time');

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH}`, () => {
    const color = classColors[0];
    getNextColor.default = jest.fn().mockReturnValue(color);
    splitBySchedules.default = jest.fn(section => fromJS([section]));
    const section = {
      id: '12345',
      section: '20',
    };
    const sectionWithColor = Object.assign({}, section, { color });
    prepClassesForCalendar.default = jest.fn().mockReturnValue(
      { sections: fromJS([sectionWithColor]) },
    );

    const action = actionCreators.addSectionFromSearch(section);

    expect(
      scheduleReducer(initialScheduleState, action),
    ).toEqual(
      initialScheduleState
        .update('sections', sections => sections.push(fromJS(sectionWithColor)))
        .update('colorUses', colorUses => colorUses.set(color, 1)),
    );
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH} when section has associated classes`, () => {
    timeUtils.isUnscheduled.mockReturnValue(false);
    const section = {
      id: '12345',
      section: '20',
      associatedClasses: [{
        schedule: {
          dow: [
            'Fr',
          ],
          end: {
            hour: 13,
            minute: 50,
          },
          location: 'Annenberg Hall G01',
          start: {
            hour: 13,
            minute: 0,
          },
        },
        type: 'LAB',
      }],
    };

    const sections = fromJS([section]);
    prepClassesForCalendar.default = jest.fn().mockReturnValue(
      { sections: fromJS([section]) },
    );

    const action = actionCreators.addSectionFromSearch(section);

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(initialScheduleState.merge({
        sectionPreview: sections.setIn([0, 'color'], northwesternPurple30),
        sections: [],
      }));
  });

  it(`should handle ${actionTypes.ADD_SECTION_FROM_SEARCH} when section has associated classes that are all unscheduled`, () => {
    timeUtils.isUnscheduled.mockReturnValue(true);
    const color = classColors[0];
    getNextColor.default = jest.fn().mockReturnValue(color);
    splitBySchedules.default = jest.fn(section => fromJS([section]));
    const section = {
      associatedClasses: [{
        schedule: {
          dow: 'TBA',
          end: 'TBA',
          location: 'Annenberg Hall G01',
          start: 'TBA',
        },
        type: 'LAB',
      }],
    };
    const sectionWithColor = Object.assign({}, section, { color });
    prepClassesForCalendar.default = jest.fn().mockReturnValue(
      { sections: fromJS([sectionWithColor]) },
    );

    const action = actionCreators.addSectionFromSearch(section);

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
    prepClassesForCalendar.default = jest.fn().mockImplementation(
      (sections, color, associatedClasses) => ({ sections, associatedClasses }),
    );
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

  it(`should handle ${actionTypes.REMOVE_ALL_CLASSES}`, () => {
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
    prepClassesForCalendar.default = jest.fn().mockImplementation(
      (sections, color, associatedClasses) => ({ sections, associatedClasses }),
    );
    const action = actionCreators.removeAllClasses();

    expect(
      scheduleReducer(scheduleWithSectionsState, action).get('sections'),
    ).toEqual(fromJS([]));
  });

  it(`should handle ${actionTypes.VIEW_SECTION_SELECTION}`, () => {
    const action = actionCreators.viewSectionSelection({});
    expect(scheduleReducer(initialScheduleState, action)).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_SEARCH}`, () => {
    const state = initialScheduleState
      .set('sectionPreview', fromJS([{ id: '12345', color: northwesternPurple30 }]));

    const color = classColors[0];
    getNextColor.default = jest.fn().mockReturnValue(color);
    const associatedClass = {
      schedule: {
        dow: ['Mo'],
      },
    };
    const associatedClasses = fromJS([associatedClass]);
    prepClassesForCalendar.default = jest.fn().mockImplementation(
      (mockSections, mockColor, mockAssociatedClasses) => ({
        sections: mockSections,
        associatedClasses: mockAssociatedClasses,
      }),
    );

    const action = actionCreators.addSectionWithAssociatedClassFromSearch(associatedClass);

    expect(scheduleReducer(state, action))
      .toEqual(initialScheduleState.merge({
        sections: fromJS([{ id: '12345' }]),
        associatedClasses: associatedClasses
          .setIn([0, 'sectionId'], '12345')
          .setIn([0, 'event'], fromJS({ dow: 'Mo' })),
        colorUses: initialScheduleState.get('colorUses').set(color, 1),
      }));
  });

  it(`handles ${actionTypes.SECTION_HOVER}`, () => {
    const section = { id: '12345' };
    const sections = fromJS([section]);
    splitBySchedules.default.mockReturnValue(sections);
    const action = actionCreators.sectionHover(section);

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(
        initialScheduleState.set(
          'sectionPreview',
          sections.setIn([0, 'color'], northwesternPurple30),
        ),
      );
  });

  it(`handles ${actionTypes.SECTION_HOVER_OFF}`, () => {
    const state = initialScheduleState.set('sectionPreview', fromJS([{}]));
    const action = actionCreators.sectionHoverOff();
    expect(scheduleReducer(state, action)).toEqual(initialScheduleState);
  });

  it(`handles ${actionTypes.ASSOCIATED_CLASS_HOVER}`, () => {
    const sectionId = '12345';
    const state = initialScheduleState.set('sectionPreview', fromJS([{ id: sectionId }]));
    const associatedClass = {
      schedule: {
        dow: ['Mo'],
      },
    };
    const action = actionCreators.associatedClassHover(associatedClass);

    const expectedAssociatedClass = fromJS(associatedClass).merge({
      color: northwesternPurple30,
      sectionId,
      event: {
        dow: 'Mo',
      },
    });
    expect(scheduleReducer(state, action))
      .toEqual(
        state.set('associatedClassPreview', fromJS([expectedAssociatedClass])),
      );
  });

  it(`handles ${actionTypes.ASSOCIATED_CLASS_HOVER_OFF}`, () => {
    const state = initialScheduleState.set('associatedClassPreview', fromJS([{}]));
    const action = actionCreators.associatedClassHoverOff();
    expect(scheduleReducer(state, action)).toEqual(initialScheduleState);
  });
});
