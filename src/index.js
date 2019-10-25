import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { createStore, compose, applyMiddleware } from 'redux';
import { install as installReduxLoop } from 'redux-loop';
import createActionEnhancerMiddleware from 'redux-action-enhancer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fromJS } from 'immutable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'material-design-icons';
import App from 'components/App';
import rootReducer from 'reducers';
import { initialScheduleState } from 'reducers/schedule';
import { northwesternPurple, northwesternBrightOrange } from 'util/colors';
import isProduction from 'util/env';
import { SnackbarProvider } from 'notistack';
import enhancers from 'actions/action-enhancers';

const styles = {
  '@global body': {
    margin: 0,
  },
  '@global ol': {
    fontFamily: 'Roboto, sans-serif',
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
});

let composeEnhancers;
if (isProduction) {
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
    colorUses: persistedSchedule.colorUses,
  });
  persistedState = fromJS({ schedule: persistedScheduleState });
}

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    installReduxLoop(),
    applyMiddleware(createActionEnhancerMiddleware(() => enhancers)),
  ),
);

let previousScheduleState;
store.subscribe(() => {
  const state = store.getState();
  const schedule = {
    sections: state.getIn(['schedule', 'sections']),
    associatedClasses: state.getIn(['schedule', 'associatedClasses']),
    colorUses: state.getIn(['schedule', 'colorUses']),
  };
  const scheduleState = JSON.stringify(schedule);

  // Only set to localStorage if state we care about has changed, for performance
  if (scheduleState !== previousScheduleState) {
    window.localStorage.setItem('schedule', scheduleState);
    previousScheduleState = scheduleState;
  }
});

function Index() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Router>
            <App />
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

const StyledIndex = injectSheet(styles)(Index);

ReactDOM.render(
  <StyledIndex />,
  document.getElementById('root'),
);
