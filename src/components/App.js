import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getSchoolsRequest,
  fetchSearchIndex as fetchSearchIndexAction,
} from 'actions';
import { auth } from 'util/firebase';
import toJS from 'util/to-js';
import { CURRENT_TERM } from 'util/constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter, Route } from 'react-router-dom';
import TopBar from './TopBar';
import NavDrawer from './NavDrawer';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import FAQPage from './Pages/FAQPage';
import BugReportPage from './Pages/BugReportPage';
import ContactPage from './Pages/ContactPage';

export const styles = {
  calendar: {
    overflow: 'auto',
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

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

  toggleNav() {
    this.setState(oldState => ({
      navigationOpen: !oldState.navigationOpen,
    }));
  }

  render() {
    const { classes } = this.props;
    const { navigationOpen } = this.state;

    return (
      <Fragment>
        <TopBar menuAction={this.toggleNav} />
        <NavDrawer isOpen={navigationOpen} closeFunc={this.toggleNav} />
        <Route
          exact
          path="/"
          render={/* istanbul ignore next */ props => <HomePage {...props} classes={classes} />}
        />
        {/* istanbul ignore next */}
        <Route path="/about" component={AboutPage} />
        {/* istanbul ignore next */}
        <Route path="/faq" component={FAQPage} />
        {/* istanbul ignore next */}
        <Route path="/report" component={BugReportPage} />
        {/* istanbul ignore next */}
        <Route path="/contact" component={ContactPage} />
      </Fragment>
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
export default withRouter(connect(null, mapDispatchToProps)(AppWithStyles));
