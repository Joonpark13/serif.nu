import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { coursesSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSectionsForBrowseRequest, selectCourseInBrowse } from 'actions';
import Courses from './Courses';


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    courses: coursesSelector(state),
    isFetching: browseIsFetchingSelector(state),
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
