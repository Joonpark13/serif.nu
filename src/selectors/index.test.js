import { fromJS } from 'immutable';
import { sectionsSelector, currentBrowseLevelSelector } from './index';

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
