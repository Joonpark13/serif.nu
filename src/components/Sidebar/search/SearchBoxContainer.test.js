import { fromJS } from 'immutable';
import { currentSearchInputSelector } from './SearchBoxContainer';

describe('SearchBoxContainer', () => {
  describe('currentSearchInputSelector', () => {
    it('should select current search input from state', () => {
      const testSearchInput = 'EECS';
      const testState = fromJS({
        search: {
          currentSearchInput: testSearchInput,
        },
      });

      expect(currentSearchInputSelector(testState)).toEqual(testSearchInput);
    });
  });
});
