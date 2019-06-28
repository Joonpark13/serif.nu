import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchCurrentTermRequest } from 'actions';
import { auth } from 'util/firebase';
import toJS from 'util/to-js';
import TopBar from './TopBar';
import NavDrawer from './NavDrawer';
import AppBody from './AppBody';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BugReportPage from './pages/BugReportPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    const { fetchCurrentTerm } = this.props;

    auth.signInAnonymously(); // TODO handle sign in error using .catch()

    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCurrentTerm();
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
        <Switch>
          <Route
            exact
            path="/"
            component={AppBody}
          />
          <Route path="/about" component={AboutPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/bugs" component={BugReportPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/legal" component={LegalPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {
  fetchCurrentTerm: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchCurrentTerm: fetchCurrentTermRequest,
};


export { App as UnconnectedApp };
const ConnectedApp = connect(null, mapDispatchToProps)(toJS(App));
export default withRouter(connect(null, mapDispatchToProps)(ConnectedApp));
