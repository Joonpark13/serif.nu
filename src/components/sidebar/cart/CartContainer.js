import toJS from 'util/to-js';
import { connect } from 'react-redux';
import { sectionsSelector } from 'selectors';
import { removeAllClasses } from 'actions';
import Cart from './Cart';

/* istanbul ignore next */
const mapStateToProps = state => ({
  sections: sectionsSelector(state),
});

function mapDispatchToProps(dispatch) {
  return {
    removeAllClasses: () => dispatch(removeAllClasses()),
  };
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(toJS(Cart));

export default CartContainer;
