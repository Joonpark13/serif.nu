import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { isFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSectionsForBrowseRequest, selectCourseInBrowse } from 'actions';
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

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    showSections: (schoolId, subjectId, courseId) => {
      dispatch(fetchSectionsForBrowseRequest(schoolId, subjectId, courseId));
      dispatch(selectCourseInBrowse(courseId));
      dispatch(changeBrowseLevel('section'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Courses));
