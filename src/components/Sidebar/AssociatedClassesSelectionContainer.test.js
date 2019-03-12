import { fromJS } from 'immutable';
import { currentCourseNameSelector, currentSectionNumberSelector, currentAssociatedClassesSelector } from './AssociatedClassesSelectionContainer';

describe('AssociatedClassesSelectionContainer', () => {
  describe('currentCourseNameSelector', () => {
    it('should select current course name from state', () => {
      const currentCourseName = 'Some Course Name';
      const testState = fromJS({
        search: {
          currentCourseName,
        },
      });

      expect(currentCourseNameSelector(testState)).toEqual(currentCourseName);
    });
  });

  describe('currentSectionNumberSelector', () => {
    it('should select current section number from state', () => {
      const currentSectionNumber = '78719';
      const testState = fromJS({
        search: {
          currentSectionNumber,
        },
      });

      expect(currentSectionNumberSelector(testState)).toEqual(currentSectionNumber);
    });
  });

  describe('currentAssociatedClassesSelector', () => {
    it('should select current section number from state', () => {
      const currentAssociatedClasses = [];
      const testState = fromJS({
        search: {
          currentAssociatedClasses,
        },
      });

      expect(currentAssociatedClassesSelector(testState)).toEqual(fromJS(currentAssociatedClasses));
    });
  });
});
