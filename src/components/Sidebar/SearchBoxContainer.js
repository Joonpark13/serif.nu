import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import { fetchSearchResults, clearSearchResults } from '../../actions';

/* istanbul ignore next */
const mapDispatchToProps = {
  handleSearchInput: fetchSearchResults,
  clearSearchResults,
};

const SearchBoxContainer = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBoxContainer;
