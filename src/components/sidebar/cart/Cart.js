import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { sectionsSelector } from 'selectors';
import useSelector from 'util/use-selector';
import CartSection from './CartSection';

export const styles = {
  cartHeading: {
    padding: '16px',
  },
};

function Cart({ classes }) {
  const sections = useSelector(sectionsSelector);

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

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-between">
        <Typography variant="h5" className={classes.cartHeading}>
          {uniqueSections.length}
          {' '}
          {label}
        </Typography>
        {!!uniqueSections.length && <Button> Remove All </Button>}
      </Grid>
      {uniqueSections.map(section => <CartSection key={section.id} section={section} />)}
    </React.Fragment>
  );
}

Cart.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Cart as UnstyledCart };
export default withStyles(styles)(Cart);
