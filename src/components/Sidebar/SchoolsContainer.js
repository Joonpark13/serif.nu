import { connect } from 'react-redux';
import toJS from 'util/to-js';
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

const SchoolsContainer = connect(mapStateToProps)(toJS(Schools));

export default SchoolsContainer;
