import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { viewSearch } from 'actions';
import SectionSelection from './SectionSelection';

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
});

const mapDispatchToProps = {
  back: viewSearch,
};

const SectionSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(
  toJS(SectionSelection),
);

export default SectionSelectionContainer;
