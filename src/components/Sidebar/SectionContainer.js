import { connect } from 'react-redux';
import toJS from 'util/to-js';
import { addSection } from 'actions';
import Section from './Section';

const mapDispatchToProps = {
  addSection,
};

export default connect(null, mapDispatchToProps)(toJS(Section));
