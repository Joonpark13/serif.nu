import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import CalendarViewContainer from './Calendar/CalendarViewContainer';
import SidebarView from './Sidebar/SidebarView';

export const styles = {
  calendar: {
    overflow: 'auto',
  },
};

function App({ classes }) {
  return (
    <React.Fragment>
      <TopBar />
      <Grid container>
        <Grid item md={9} sm={12} xs={12} className={classes.calendar}>
          <CalendarViewContainer />
        </Grid>

        <Grid item md={3} sm={12} xs={12}>
          <SidebarView />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { App as UnstyledApp };

export default withStyles(styles)(App);
