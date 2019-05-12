import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import CalendarView from './calendar/CalendarView';
import SidebarView from './sidebar/SidebarView';

export const styles = {
  calendar: {
    overflow: 'auto',
  },
};

function AppBody({ classes }) {
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

AppBody.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { AppBody as UnstyledAppBody };
export default withStyles(styles)(AppBody);
