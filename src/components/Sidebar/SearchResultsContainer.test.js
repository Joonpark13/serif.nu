import { fromJS } from 'immutable';
import { searchResultsSelector, isLoadingSelector } from './SearchResultsContainer';

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
  it('should select isFetching from state', () => {
    const testIsFetchingResults = fromJS([{ isFetching: false }]);
    const testState = fromJS({
      search: {
        isFetching: testIsFetchingResults,
      },
    });

    expect(isLoadingSelector(testState))
      .toEqual(testIsFetchingResults);
  });
});
