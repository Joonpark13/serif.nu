import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { sectionsSelector } from 'selectors';
import { useDispatch } from 'react-redux';
import useSelector from 'util/use-selector';
import { removeAllClasses } from 'actions';
import CartSection from './CartSection';


const useStyles = makeStyles({
  cartHeading: {
    padding: '16px',
  },
});

export default function Cart() {
  const classes = useStyles();
  const sections = useSelector(sectionsSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeAllClasses());
  };
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
        {!!uniqueSections.length && <Button onClick={handleClick}> Remove All </Button>}
      </Grid>
      {uniqueSections.map(section => <CartSection key={section.id} section={section} />)}
    </React.Fragment>
  );
}
