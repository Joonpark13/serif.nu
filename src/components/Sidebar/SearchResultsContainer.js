import { connect } from 'react-redux';
import toJS from 'util/to-js';
import SearchResults from './SearchResults';

export function searchResultsSelector(state) {
  return state.getIn(['search', 'results']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  searchResults: searchResultsSelector(state),
});

const SearchResultsContainer = connect(mapStateToProps)(toJS(SearchResults));

export default SearchResultsContainer;
