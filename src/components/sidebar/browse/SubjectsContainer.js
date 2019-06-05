import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { changeBrowseLevel, fetchCoursesRequest, selectSubjectInBrowse } from 'actions';
import { subjectsSelector, browseIsFetchingSelector } from 'selectors';
import Subjects from './Subjects';


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    subjects: subjectsSelector(state),
    isFetching: browseIsFetchingSelector(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    showCourses: (schoolId, subjectId) => {
      dispatch(fetchCoursesRequest(schoolId, subjectId));
      dispatch(selectSubjectInBrowse(subjectId));
      dispatch(changeBrowseLevel('course'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Subjects));
