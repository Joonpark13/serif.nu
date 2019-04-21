import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import Schools from './Schools';

export function schoolsSelector(state) {
  return state.getIn(['browse', 'schools']);
}

export function isFetchingSelector(state) {
  return state.getIn(['browse', 'isFetching']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  schools: schoolsSelector(state),
  isFetching: isFetchingSelector(state),
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
