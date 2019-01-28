import { fromJS } from 'immutable';
import { sectionsSelector } from './index';

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
