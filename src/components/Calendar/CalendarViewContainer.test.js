import { fromJS } from 'immutable';
import { sectionsSelector } from './CalendarViewContainer';

describe('CalendarViewContainer', () => {
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
});
