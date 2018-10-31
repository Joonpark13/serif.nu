import { fromJS } from 'immutable';
import { setCurrentCourseName } from 'actions';
import { searchResultsSelector, isFetchingSelector, mapDispatchToProps } from './SearchResultsContainer';

describe('SearchResultsContainer', () => {
  describe('searchResultsSelector', () => {
    it('should select search results from state', () => {
      const testSearchResults = fromJS([{ name: 'My Course ' }]);
      const testState = fromJS({
        search: {
          results: testSearchResults,
        },
      });

      expect(searchResultsSelector(testState)).toEqual(testSearchResults);
    });
  });

  describe('isFetchingSelector', () => {
    it('should select isFetching from state', () => {
      const testIsFetchingResults = fromJS([{ isFetching: false }]);
      const testState = fromJS({
        search: {
          isFetching: testIsFetchingResults,
        },
      });

      expect(isFetchingSelector(testState)).toEqual(testIsFetchingResults);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();

    it('should dispatch correct actions for handleCourseClick', () => {
      const school = 'MEAS';
      const subject = 'EECS';
      const courseAbbv = '101-0';

      mapDispatchToProps(dispatchMock).handleCourseClick(school, subject, courseAbbv);

      // async fetch action returns anonymous function
      expect(dispatchMock.mock.calls[0][0]).toEqual(expect.any(Function));
      expect(dispatchMock.mock.calls[1][0]).toEqual(setCurrentCourseName(`${subject} ${courseAbbv}`));
    });
  });
});
