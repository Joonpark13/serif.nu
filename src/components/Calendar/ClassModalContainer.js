import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { removeSection } from 'actions';
import ClassModal from './ClassModal';

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    removeSection: (sectionId, sectionColor) => dispatch(removeSection(sectionId, sectionColor)),
  };
}

const ClassModalContainer = connect(null, mapDispatchToProps)(toJS(ClassModal));

export default ClassModalContainer;
