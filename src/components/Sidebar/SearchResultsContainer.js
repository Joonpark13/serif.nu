import { connect } from 'react-redux';
import toJS from 'util/to-js';
import SearchResults from './SearchResults';

export function searchResultsSelector(state) {
  return state.getIn(['search', 'results']);
}

export function isLoadingSelector(state) {
  return state.getIn(['search', 'isFetching']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  searchResults: searchResultsSelector(state),
  isFetching: isLoadingSelector(state),
});

const SearchResultsContainer = connect(mapStateToProps)(toJS(SearchResults));

export default SearchResultsContainer;
