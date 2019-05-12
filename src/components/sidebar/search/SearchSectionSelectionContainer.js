import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { viewSearch, addSectionFromSearch } from 'actions';
import { scheduledSectionsSelector } from 'selectors';
import SectionSelection from '../common/SectionSelection';

export function currentCourseNameSelector(state) {
  return state.getIn(['search', 'currentCourseName']);
}

export function currentSectionsSelector(state) {
  return state.getIn(['search', 'currentSections']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentCourseName: currentCourseNameSelector(state),
  sections: currentSectionsSelector(state),
  scheduledSections: scheduledSectionsSelector(state),
});

const mapDispatchToProps = {
  back: viewSearch,
  addSection: addSectionFromSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SectionSelection));
