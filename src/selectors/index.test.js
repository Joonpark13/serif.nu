import { fromJS } from 'immutable';
import {
  sectionsSelector,
  currentBrowseLevelSelector,
  isFetchingSelector,
  scheduledSectionsSelector,
  selectedCourseNameSelector,
} from './index';

describe('sectionsSelctor', () => {
  it('should select sections from schedule state', () => {
    const testSections = fromJS([]);
    const testState = fromJS({
      schedule: {
        sections: testSections,
      },
    });

    expect(sectionsSelector(testState)).toEqual(testSections);
  });
});

describe('currentBrowseLevelSelector', () => {
  it('should select current browse level from browse state', () => {
    const currentBrowseLevel = 'school';
    const testState = fromJS({
      browse: {
        currentBrowseLevel,
      },
    });

    expect(currentBrowseLevelSelector(testState)).toEqual(currentBrowseLevel);
  });
});

describe('isFetchingSelector', () => {
  it('should select isFetching from browse state', () => {
    const testIsFetchingResults = fromJS([{ isFetching: false }]);
    const testState = fromJS({
      browse: {
        isFetching: testIsFetchingResults,
      },
    });

    expect(isFetchingSelector(testState)).toEqual(testIsFetchingResults);
  });
});

describe('scheduledSectionsSelector', () => {
  it('should select scheduled sections from state', () => {
    const testScheduledSections = fromJS([]);
    const testState = fromJS({
      schedule: {
        sections: testScheduledSections,
      },
    });

    expect(scheduledSectionsSelector(testState)).toEqual(testScheduledSections);
  });
});

describe('selectedCourseNameSelector', () => {
  it('should select selected course name from browse state', () => {
    const name = 'Introduction to Something';
    const state = fromJS({
      browse: {
        selected: {
          course: {
            name,
          },
        },
      },
    });

    expect(selectedCourseNameSelector(state)).toBe(name);
  });
});
