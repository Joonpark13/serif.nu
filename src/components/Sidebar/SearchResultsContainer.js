import { connect } from 'react-redux';
import { fetchSections, setCurrentCourseName } from 'actions';
import toJS from 'util/to-js';
import SearchResults from './SearchResults';

export function searchResultsSelector(state) {
  return state.getIn(['search', 'results']);
}

export function isFetchingSelector(state) {
  return state.getIn(['search', 'isFetching']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  searchResults: searchResultsSelector(state),
  isFetching: isFetchingSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  handleCourseClick: (school, subject, courseAbbv) => {
    dispatch(fetchSections('4720', school, subject, courseAbbv));
    dispatch(setCurrentCourseName(`${subject} ${courseAbbv}`));
  },
});

const SearchResultsContainer = connect(mapStateToProps, mapDispatchToProps)(toJS(SearchResults));

export default SearchResultsContainer;
