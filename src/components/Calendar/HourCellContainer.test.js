import { fromJS } from 'immutable';
import { sectionsForHourSelector, associatedClassesForHourSelector } from './HourCellContainer';

describe('sectionsForHourSelector', () => {
  it('should select all sections for a given hour and dow', () => {
    const testSection = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const testState = fromJS({
      schedule: {
        sections: [testSection],
      },
    });
    expect(sectionsForHourSelector(testState, 13, 'Mo')).toEqual(fromJS([testSection]));
  });
});

describe('associatedClassesForHourSelector', () => {
  it('should select all associated classes for a given hour and dow', () => {
    const testAssociatedClass = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const testState = fromJS({
      schedule: {
        associatedClasses: [testAssociatedClass],
      },
    });
    expect(associatedClassesForHourSelector(testState, 13, 'Mo')).toEqual(fromJS([testAssociatedClass]));
  });
});
