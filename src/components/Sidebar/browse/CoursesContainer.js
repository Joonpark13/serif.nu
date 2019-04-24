import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { isFetchingSelector } from 'selectors';
import Courses from './Courses';

export function coursesSelector(state) {
  return state
    .getIn(['browse', 'courses'])
    .sortBy(course => `${course.get('id')} ${course.get('name')}`);
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    courses: coursesSelector(state),
    isFetching: isFetchingSelector(state),
  };
}

export default connect(mapStateToProps)(toJS(Courses));
