import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { addSectionFromBrowse, changeBrowseLevel } from 'actions';
import { selectedCourseNameSelector, scheduledSectionsSelector } from 'selectors';
import SectionSelection from '../common/SectionSelection';

export function sectionsSelector(state) {
  return state.getIn(['browse', 'sections']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentCourseName: selectedCourseNameSelector(state),
  sections: sectionsSelector(state),
  scheduledSections: scheduledSectionsSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = {
  back: () => changeBrowseLevel('course'),
  addSection: addSectionFromBrowse,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SectionSelection));
