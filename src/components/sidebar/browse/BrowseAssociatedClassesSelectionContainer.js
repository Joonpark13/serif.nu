import { connect } from 'react-redux';
import toJS from 'util/to-js';
import {
  addSectionWithAssociatedClassFromBrowse,
  changeBrowseLevel,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import {
  selectedCourseNameSelector,
  selectedSectionNumberSelector,
  selectedSectionAssociatedClassesSelector,
} from 'selectors';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentCourseName: selectedCourseNameSelector(state),
    currentSectionNumber: selectedSectionNumberSelector(state),
    associatedClasses: selectedSectionAssociatedClassesSelector(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  back: () => changeBrowseLevel('section'),
  addSectionWithAssociatedClass: addSectionWithAssociatedClassFromBrowse,
  associatedClassHover,
  associatedClassHoverOff,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AssociatedClassesSelection));
