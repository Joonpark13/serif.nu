import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import {
  getSchoolsRequest,
  fetchSearchIndex as fetchSearchIndexAction,
} from 'actions';
import { auth } from 'util/firebase';
import toJS from 'util/to-js';
import { CURRENT_TERM } from 'util/constants';
import TopBar from './TopBar';
import NavDrawer from './NavDrawer';
import AppBody from './AppBody';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BugReportPage from './pages/BugReportPage';
import ContactPage from './pages/ContactPage';

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
    const { navigationOpen } = this.state;

    return (
      <Fragment>
        <TopBar menuAction={this.toggleNav} />
        <NavDrawer isOpen={navigationOpen} closeFunc={this.toggleNav} />
        <Route
          exact
          path="/"
          render={/* istanbul ignore next */ props => <AppBody {...props} />}
        />
        <Route path="/about" render={/* istanbul ignore next */() => <AboutPage />} />
        <Route path="/faq" render={/* istanbul ignore next */ () => <FAQPage />} />
        <Route path="/report" render={/* istanbul ignore next */ () => <BugReportPage />} />
        <Route path="/contact" render={/* istanbul ignore next */ () => <ContactPage />} />
      </Fragment>
    );
  }
}

App.propTypes = {
  fetchSchools: PropTypes.func.isRequired,
  fetchSearchIndex: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchSchools: getSchoolsRequest,
  fetchSearchIndex: fetchSearchIndexAction,
};

export { App as UnconnectedApp };
const ConnectedApp = connect(null, mapDispatchToProps)(toJS(App));
export default withRouter(connect(null, mapDispatchToProps)(ConnectedApp));
