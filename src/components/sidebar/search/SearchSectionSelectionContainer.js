import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { viewSearch, addSectionFromSearch } from 'actions';
import { currentCourseNameSelector, currentSectionsSelector, sectionsSelector } from 'selectors';
import SectionSelection from '../common/SectionSelection';


/* istanbul ignore next */
const mapStateToProps = state => ({
  currentCourseName: currentCourseNameSelector(state),
  sections: currentSectionsSelector(state),
  scheduledSections: sectionsSelector(state),
});

const mapDispatchToProps = {
  back: viewSearch,
  addSection: addSectionFromSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SectionSelection));
