import { fromJS } from 'immutable';
import { schoolsSelector, isFetchingSelector } from './SchoolsContainer';

describe('SchoolsContainer', () => {
  describe('schoolsSelector', () => {
    it('should select school results from state', () => {
      const testSchoolResults = fromJS([{ name: 'Bienen School of Music' }]);
      const testState = fromJS({
        browse: {
          schools: [
            { name: 'Bienen School of Music' },
          ],
        },
      });

      expect(schoolsSelector(testState)).toEqual(testSchoolResults);
    });
  });

  describe('isFetchingSelector', () => {
    it('should select isFetching from state', () => {
      const testIsFetchingResults = fromJS([{ isFetching: false }]);
      const testState = fromJS({
        browse: {
          isFetching: testIsFetchingResults,
        },
      });

      expect(isFetchingSelector(testState)).toEqual(testIsFetchingResults);
    });
  });
});
