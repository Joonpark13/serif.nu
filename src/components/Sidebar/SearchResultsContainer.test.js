import { fromJS } from 'immutable';
import { searchResultsSelector } from './SearchResultsContainer';

describe('searchResultsSelector', () => {
  it('should select search results from state', () => {
    const testSearchResults = fromJS([{ name: 'My Course ' }]);
    const testState = fromJS({
      search: {
        results: testSearchResults,
      },
    });

    expect(searchResultsSelector(testState))
      .toEqual(testSearchResults);
  });
});
