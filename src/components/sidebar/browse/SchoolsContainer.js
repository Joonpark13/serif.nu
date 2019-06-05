import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import { schoolsSelector, browseIsFetchingSelector } from 'selectors';
import Schools from './Schools';


/* istanbul ignore next */
const mapStateToProps = state => ({
  schools: schoolsSelector(state),
  isFetching: browseIsFetchingSelector(state),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    showSubjects: (schoolId) => {
      dispatch(fetchSubjectsRequest(schoolId));
      dispatch(selectSchoolInBrowse(schoolId));
      dispatch(changeBrowseLevel('subject'));
    },
  };
}

const SchoolsContainer = connect(mapStateToProps, mapDispatchToProps)(toJS(Schools));

export default SchoolsContainer;
