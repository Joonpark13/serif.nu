import { fromJS } from 'immutable';
import {
  sectionsForHourSelector,
  associatedClassesForHourSelector,
  sectionPreviewSelector,
  associatedClassPreviewSelector,
  allSectionPreviewsSelector,
} from './HourCellContainer';

describe('sectionsForHourSelector', () => {
  it('selects all sections for a given hour and dow', () => {
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
  it('selects all associated classes for a given hour and dow', () => {
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
    expect(associatedClassesForHourSelector(testState, 13, 'Mo'))
      .toEqual(fromJS([testAssociatedClass]));
  });
});

describe('sectionPreviewSelector', () => {
  it('selects section preview from the schedule state', () => {
    const previewSection = fromJS({
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
    const state = fromJS({
      schedule: {
        sectionPreview: [previewSection],
      },
    });

    expect(sectionPreviewSelector(state, 13, 'Mo')).toEqual(previewSection);
  });
});

describe('associatedClassPreviewSelector', () => {
  it('selects associated class preview from the schedule state', () => {
    const previewAssociatedClass = fromJS({
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
    const state = fromJS({
      schedule: {
        associatedClassPreview: [previewAssociatedClass],
      },
    });

    expect(associatedClassPreviewSelector(state, 13, 'Mo'))
      .toEqual(previewAssociatedClass);
  });
});

describe('allSectionPreviewsSelector', () => {
  it('selects all section previews', () => {
    const sectionPreview = fromJS([]);
    const state = fromJS({
      schedule: {
        sectionPreview,
      },
    });
    expect(allSectionPreviewsSelector(state)).toEqual(sectionPreview);
  });
});
