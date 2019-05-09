import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { getSearchResultsRequest, clearSearchResults, updateSearchInput } from 'actions';
import SearchBox from './SearchBox';

export function currentSearchInputSelector(state) {
  return state.getIn(['search', 'currentSearchInput']);
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentSearchInput: currentSearchInputSelector(state),
  };
}

const mapDispatchToProps = {
  handleSearchInput: getSearchResultsRequest,
  clearSearchResults,
  updateSearchInput,
};

const SearchBoxContainer = connect(mapStateToProps, mapDispatchToProps)(toJS(SearchBox));

export default SearchBoxContainer;
