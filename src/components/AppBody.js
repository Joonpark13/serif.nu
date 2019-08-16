import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CalendarView from './calendar/CalendarView';
import SidebarView from './sidebar/SidebarView';

const useStyles = makeStyles({
  calendar: {
    overflow: 'auto',
  },
});

export default function AppBody() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={9} sm={12} xs={12} className={classes.calendar}>
        <CalendarView />
      </Grid>

      <Grid item md={3} sm={12} xs={12}>
        <SidebarView />
      </Grid>
    </Grid>
  );
}
