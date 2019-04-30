import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { createStore, compose } from 'redux';
import { install as installReduxLoop } from 'redux-loop';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fromJS } from 'immutable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'components/App';
import rootReducer from 'reducers';
import { initialScheduleState } from 'reducers/schedule';
import { northwesternPurple, northwesternBrightOrange } from 'util/colors';

// https://material-ui.com/css-in-js/basics/#migration-for--material-ui-core-users
/* eslint-disable-next-line import/newline-after-import */
import { install as installMaterialUIStyles } from '@material-ui/styles';
installMaterialUIStyles();

const styles = {
  '@global body': {
    margin: 0,
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: northwesternPurple,
    },
    secondary: {
      main: northwesternBrightOrange,
    },
  },
  // https://material-ui.com/style/typography/#strategies
  // Remove once Material-UI is upgraded to 4.0
  typography: {
    useNextVariants: true,
  },
});

let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
/* eslint-disable no-underscore-dangle */
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
}

const persistedSchedule = JSON.parse(window.localStorage.getItem('schedule'));
let persistedState;
if (persistedSchedule) {
  const persistedScheduleState = initialScheduleState.merge({
    sections: persistedSchedule.sections,
    associatedClasses: persistedSchedule.associatedClasses,
  });
  persistedState = fromJS({ schedule: persistedScheduleState });
}

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(installReduxLoop()),
);

let previousScheduleState;
store.subscribe(() => {
  const state = store.getState();
  const schedule = {
    sections: state.getIn(['schedule', 'sections']),
    associatedClasses: state.getIn(['schedule', 'associatedClasses']),
  };
  const scheduleState = JSON.stringify(schedule);

  // Only set to localStorage if state we care about has changed for performance
  if (scheduleState !== previousScheduleState) {
    window.localStorage.setItem('schedule', scheduleState);
    previousScheduleState = scheduleState;
  }
});

function Index() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

const StyledIndex = injectSheet(styles)(Index);

ReactDOM.render(
  <StyledIndex />,
  document.getElementById('root'),
);
