import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSchoolsRequest,
  fetchSearchIndex as fetchSearchIndexAction,
} from 'actions';
import { auth } from 'util/firebase';
import toJS from 'util/to-js';
import { CURRENT_TERM } from 'util/constants';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import ClassesView from './Calendar/ClassesView';
import SidebarView from './Sidebar/SidebarView';

export const styles = {
  calendar: {
    overflow: 'auto',
  },
};

class App extends Component {
  componentDidMount() {
    const { fetchSchools, fetchSearchIndex } = this.props;

    auth.signInAnonymously(); // TODO handle sign in error using .catch()

    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchSchools(CURRENT_TERM);
        fetchSearchIndex(CURRENT_TERM);
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <TopBar />
        <Grid container>
          <Grid item md={9} sm={12} xs={12} className={classes.calendar}>
            <ClassesView />
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <SidebarView />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  fetchSchools: PropTypes.func.isRequired,
  fetchSearchIndex: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchSchools: getSchoolsRequest,
  fetchSearchIndex: fetchSearchIndexAction,
};

export { App as UnstyledApp };
const AppWithStyles = toJS(withStyles(styles)(App));
export default connect(null, mapDispatchToProps)(AppWithStyles);
