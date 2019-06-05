import { connect } from 'react-redux';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';
import toJS from 'util/to-js';
import { searchResultsSelector, searchIsFetchingSelector, currentSearchInputSelector } from 'selectors';
import SearchResults from './SearchResults';

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    searchResults: searchResultsSelector(state),
    isFetching: searchIsFetchingSelector(state),
    currentSearchInput: currentSearchInputSelector(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    handleCourseClick: (schoolId, subjectId, courseId) => {
      dispatch(fetchSectionsForSearchRequest(schoolId, subjectId, courseId));
      dispatch(setCurrentCourseName(`${subjectId} ${courseId}`));
    },
  };
}

const SearchResultsContainer = connect(mapStateToProps, mapDispatchToProps)(toJS(SearchResults));

export default SearchResultsContainer;
