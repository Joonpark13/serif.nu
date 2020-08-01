import React from 'react';
import { makeStyles } from '@material-ui/styles';
// Original app code left for educational reference purposes.
// import Grid from '@material-ui/core/Grid';
// import CalendarView from './calendar/CalendarView';
// import SidebarView from './sidebar/SidebarView';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  // Original app code left for educational reference purposes.
  // calendar: {
  //   overflow: 'auto',
  // },
  wrapper: {
    padding: 20,
    margin: 'auto',
    maxWidth: 500,
  },
  spacer: {
    marginBottom: 20,
  },
  signOff: {
    textAlign: 'right',
  },
});

export default function AppBody() {
  const classes = useStyles();
  return (
  // Original app code left for educational reference purposes.
  // <Grid container>
  //   <Grid item md={9} sm={12} xs={12} className={classes.calendar}>
  //     <CalendarView />
  //   </Grid>

    //   <Grid item md={3} sm={12} xs={12}>
    //     <SidebarView />
    //   </Grid>
    // </Grid>
    <div className={classes.wrapper}>
      <div className={classes.spacer}>
        <Typography variant="h5">
          Hey Northwestern,
        </Typography>
      </div>
      <div className={classes.spacer}>
        <Typography variant="body1">
          Thanks for using Serif.nu all these years. Your support and continued usage of Serif.nu
          has meant so much to me. Who knew one app could make such an impact?
        </Typography>
      </div>
      <div className={`${classes.spacer} ${classes.signOff}`}>
        <Typography variant="body1">
          <a href="https://www.youtube.com/watch?v=EPOJhVjKfUo">Go U!</a>
        </Typography>
        <Typography variant="h6">
          <a href="https://twitter.com/JoonParkMusic">Joon</a>
        </Typography>
      </div>
    </div>
  );
}
