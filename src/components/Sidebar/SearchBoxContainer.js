import { connect } from 'react-redux';
import { fetchSearchResults, clearSearchResults, updateSearchInput } from 'actions';
import SearchBox from './SearchBox';

export function currentSearchInputSelector(state) {
  return state.getIn(['search', 'currentSearchInput']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentSearchInput: currentSearchInputSelector(state),
});

const mapDispatchToProps = {
  handleSearchInput: fetchSearchResults,
  clearSearchResults,
  updateSearchInput,
};

const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBox);

export default SearchBoxContainer;
