import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { sectionsSelector } from 'selectors';
import useSelector from 'util/use-selector';
import CartSection from './CartSection';
import CartDialog from './CartDialog';


const useStyles = makeStyles({
  cartHeading: {
    padding: '16px',
  },
});

export default function Cart() {
  const classes = useStyles();
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
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
        {open && <CartDialog />}
      </Grid>
      {uniqueSections.map(section => <CartSection key={section.id} section={section} />)}
    </React.Fragment>
  );
}
