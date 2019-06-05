import { setCurrentCourseName, fetchSectionsForSearchRequest } from 'actions';
import { mapDispatchToProps } from './SearchResultsContainer';

describe('SearchResultsContainer', () => {
  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();

    it('should dispatch correct actions for handleCourseClick', () => {
      const school = 'MEAS';
      const subject = 'EECS';
      const courseId = '101-0';

      mapDispatchToProps(dispatchMock).handleCourseClick(school, subject, courseId);

      expect(dispatchMock.mock.calls[0][0]).toEqual(
        fetchSectionsForSearchRequest(school, subject, courseId),
      );
      expect(dispatchMock.mock.calls[1][0]).toEqual(setCurrentCourseName(`${subject} ${courseId}`));
    });
  });
});
