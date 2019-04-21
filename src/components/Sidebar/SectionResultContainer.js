import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { addSection } from 'actions';
import SectionResult from './SectionResult';

const mapDispatchToProps = {
  addSection,
};

export default connect(null, mapDispatchToProps)(toJS(SectionResult));
