import { connect } from 'react-redux';
import toJS from 'util/to-js';
import {
  viewSectionSelection,
  addSectionWithAssociatedClassFromSearch,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import {
  currentCourseNameSelector,
  currentSectionNumberSelector,
  currentAssociatedClassesSelector,
} from 'selectors';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentCourseName: currentCourseNameSelector(state),
    currentSectionNumber: currentSectionNumberSelector(state),
    associatedClasses: currentAssociatedClassesSelector(state),
  };
}

const mapDispatchToProps = {
  back: viewSectionSelection,
  addSectionWithAssociatedClass: addSectionWithAssociatedClassFromSearch,
  associatedClassHover,
  associatedClassHoverOff,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AssociatedClassesSelection));
