import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import CalendarView from '../Calendar/CalendarView';
import SidebarView from '../Sidebar/SidebarView';

function HomePage({ classes }) {
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

HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HomePage;
