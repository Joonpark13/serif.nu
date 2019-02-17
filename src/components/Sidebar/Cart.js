import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

export const styles = {
  cartHeading: {
    padding: '16px',
  },
};

function Cart({ classes, sections }) {
  const label = sections.length === 1 ? 'Class' : 'Classes';
  return (
    <Typography variant="h5" className={classes.cartHeading}>
      {sections.length}
      {' '}
      {label}
    </Typography>
  );
}

Cart.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { Cart as UnstyledCart };
export default withStyles(styles)(Cart);
