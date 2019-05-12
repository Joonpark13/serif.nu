import toJS from 'util/to-js';
import { connect } from 'react-redux';
import { sectionHover, sectionHoverOff } from 'actions';
import SectionResult from './SectionResult';

/* istanbul ignore next */
const mapDispatchToProps = { sectionHover, sectionHoverOff };

export default connect(null, mapDispatchToProps)(toJS(SectionResult));
