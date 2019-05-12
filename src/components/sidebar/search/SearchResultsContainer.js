import { connect } from 'react-redux';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';
import toJS from 'util/to-js';
import SearchResults from './SearchResults';

export function searchResultsSelector(state) {
  return state.getIn(['search', 'results']);
}

export function isFetchingSelector(state) {
  return state.getIn(['search', 'isFetching']);
}

export function currentSearchInputSelector(state) {
  return state.getIn(['search', 'currentSearchInput']);
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    searchResults: searchResultsSelector(state),
    isFetching: isFetchingSelector(state),
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
