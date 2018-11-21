import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchools } from 'actions';
import toJS from 'util/to-js';
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

class App extends Component {
  componentDidMount() {
    const { getSchools } = this.props;
    getSchools('4720');
  }

  render() {
    const { classes } = this.props;
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
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  getSchools: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getSchools: fetchSchools,
};

// export const mapDispatchToProps = dispatch => ({
//   getSchools: (term) => {
//     dispatch(fetchSchools(term));
//   },
// });

export { App as UnstyledApp };
const AppWithStyles = toJS(withStyles(styles)(App));
export default connect(null, mapDispatchToProps)(AppWithStyles);
