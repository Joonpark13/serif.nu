import { connect } from 'react-redux';
import { currentBrowseLevelSelector } from 'selectors';
import { changeBrowseLevel } from 'actions';
import toJS from 'util/to-js';
import BrowseHeader from './BrowseHeader';

export function selectedSchoolIdSelector(state) {
  return state.getIn(['browse', 'selected', 'school', 'id']);
}

export function selectedSubjectIdSelector(state) {
  return state.getIn(['browse', 'selected', 'subject', 'id']);
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentBrowseLevel: currentBrowseLevelSelector(state),
    selectedSchoolId: selectedSchoolIdSelector(state),
    selectedSubjectId: selectedSubjectIdSelector(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    back: level => dispatch(changeBrowseLevel(level)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(BrowseHeader));
