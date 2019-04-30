import { connect } from 'react-redux';
import toJS from 'util/to-js';
import {
  viewSectionSelection,
  addSectionWithAssociatedClassFromSearch,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';

export function currentCourseNameSelector(state) {
  return state.getIn(['search', 'currentCourseName']);
}

export function currentSectionNumberSelector(state) {
  return state.getIn(['search', 'currentSectionNumber']);
}

export function currentAssociatedClassesSelector(state) {
  return state.getIn(['search', 'currentAssociatedClasses']);
}

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
