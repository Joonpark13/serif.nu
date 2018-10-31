import { connect } from 'react-redux';
import { fetchSearchResults, clearSearchResults } from 'actions';
import SearchBox from './SearchBox';

/* istanbul ignore next */
const mapDispatchToProps = {
  handleSearchInput: fetchSearchResults,
  clearSearchResults,
};

const SearchBoxContainer = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBoxContainer;
