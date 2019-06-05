import { connect } from 'react-redux';
import {
  currentBrowseLevelSelector,
  selectedSchoolIdSelector,
  selectedSubjectIdSelector,
} from 'selectors';
import { changeBrowseLevel } from 'actions';
import toJS from 'util/to-js';
import BrowseHeader from './BrowseHeader';


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
