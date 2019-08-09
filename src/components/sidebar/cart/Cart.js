import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Typography, Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { sectionsSelector } from 'selectors';
import { useDispatch } from 'react-redux';
import useSelector from 'util/use-selector';
import { removeAllClasses } from 'actions';
import CartSection from './CartSection';


export const styles = {
  cartHeading: {
    padding: '16px',
  },
};

function Cart({ classes }) {
  const sections = useSelector(sectionsSelector);
  const dispatch = useDispatch();

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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleRemoveAll = () => {
    dispatch(removeAllClasses());
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-between">
        <Typography variant="h5" className={classes.cartHeading}>
          {uniqueSections.length}
          {' '}
          {label}
        </Typography>
        {!!uniqueSections.length && <Button onClick={handleClickOpen}> Remove All </Button>}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Are you sure you want to remove all classes?</DialogTitle>
          <DialogActions>
            <Button onClick={handleRemoveAll}>
              Remove
            </Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
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
