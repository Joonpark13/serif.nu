import React from 'react';
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
      <Typography variant="h5" className={classes.cartHeading}>
        {uniqueSections.length}
        {' '}
        {label}
      </Typography>
      {uniqueSections.map(section => <CartSection key={section.id} section={section} />)}
    </React.Fragment>
  );
}

Cart.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Cart as UnstyledCart };
export default withStyles(styles)(Cart);
