import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { addSectionFromBrowse, changeBrowseLevel } from 'actions';
import {
  selectedCourseNameSelector,
  browseSectionsSelector,
  sectionsSelector,
} from 'selectors';
import SectionSelection from '../common/SectionSelection';


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentCourseName: selectedCourseNameSelector(state),
    sections: browseSectionsSelector(state),
    scheduledSections: sectionsSelector(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  back: () => changeBrowseLevel('course'),
  addSection: addSectionFromBrowse,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SectionSelection));
