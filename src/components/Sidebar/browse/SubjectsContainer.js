import { connect } from 'react-redux';
import toJS from 'util/to-js';
import Subjects from './Subjects';

export function subjectsSelector(state) {
  return state.getIn(['browse', 'subjects']);
}

export function isFetchingSelector(state) {
  return state.getIn(['browse', 'isFetching']);
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    subjects: subjectsSelector(state),
    isFetching: isFetchingSelector(state),
  };
}

export default connect(mapStateToProps)(toJS(Subjects));
