import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { viewSearch, addSection } from 'actions';
import SectionSelection from './SectionSelection';

export function currentCourseNameSelector(state) {
  return state.getIn(['search', 'currentCourseName']);
}

export function currentSectionsSelector(state) {
  return state.getIn(['search', 'currentSections']);
}

export function scheduledSectionsSelector(state) {
  return state.getIn(['schedule', 'sections']);
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentCourseName: currentCourseNameSelector(state),
  sections: currentSectionsSelector(state),
  scheduledSections: scheduledSectionsSelector(state),
});

const mapDispatchToProps = {
  back: viewSearch,
  addSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SectionSelection));
