import { fromJS } from 'immutable';
import { currentCourseNameSelector, currentSectionsSelector, scheduledSectionsSelector } from './SectionSelectionContainer';

describe('SectionSelectionContainer', () => {
  describe('currentCourseNameSelector', () => {
    it('should select current course name from state', () => {
      const testCurrentCourseName = 'EECS 101-0';
      const testState = fromJS({
        search: {
          currentCourseName: testCurrentCourseName,
        },
      });

      expect(currentCourseNameSelector(testState)).toEqual(testCurrentCourseName);
    });
  });

  describe('currentSectionsSelector', () => {
    it('should select current sections from state', () => {
      const testSections = fromJS([]);
      const testState = fromJS({
        search: {
          currentSections: testSections,
        },
      });

      expect(currentSectionsSelector(testState)).toEqual(testSections);
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
});
