import toJS from 'util/to-js';
import { connect } from 'react-redux';
import { sectionsSelector } from 'selectors';
import Cart from './Cart';

/* istanbul ignore next */
const mapStateToProps = state => ({
  sections: sectionsSelector(state),
});

export default connect(mapStateToProps)(toJS(Cart));
