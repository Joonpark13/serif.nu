import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CartSection from './CartSection';

export const styles = {
  cartHeading: {
    padding: '16px',
  },
};

function Cart({ classes, sections }) {
  const uniqueSections = [];
  const usedIDs = [];

  sections.forEach(
    (section) => {
      if (!usedIDs.includes(section.id)) {
        usedIDs.push(section.id);
        uniqueSections.push(section);
      }
    },
  );

  const label = uniqueSections.length === 1 ? 'Class' : 'Classes';
  function displayButton(length) {
    if (length !== 0) {
      return (
        <Button>
           Remove All
        </Button>
      );
    }
    return (null);
  }

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-between">
        <Typography variant="h5" className={classes.cartHeading}>
          {uniqueSections.length}
          {' '}
          {label}
        </Typography>
        {displayButton(uniqueSections.length)}
      </Grid>
      {uniqueSections.map(section => <CartSection key={section.id} section={section} />)}
    </React.Fragment>
  );
}

Cart.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { Cart as UnstyledCart };
export default withStyles(styles)(Cart);
