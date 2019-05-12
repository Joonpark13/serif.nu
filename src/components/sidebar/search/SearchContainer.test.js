import { fromJS } from 'immutable';
import { searchViewSelector } from './SearchContainer';

describe('SearchContainer', () => {
  describe('searchViewSelector', () => {
    it('should select view of sidebar from state', () => {
      const testSearchView = 'search';
      const testState = fromJS({
        search: {
          view: testSearchView,
        },
      });

      expect(searchViewSelector(testState)).toEqual(testSearchView);
    });
  });
});
