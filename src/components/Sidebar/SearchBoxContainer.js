import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import { fetchSearchResults } from '../../actions';

const mapDispatchToProps = {
  handleSearchInput: fetchSearchResults,
};

const SearchBoxContainer = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBoxContainer;
