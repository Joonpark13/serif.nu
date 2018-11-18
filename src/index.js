import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { createStore, compose } from 'redux';
import { install as installReduxLoop } from 'redux-loop';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'components/App';
import rootReducer from 'reducers';
import { northwesternPurple, northwesternBrightOrange } from 'util/colors';
import { BrowserRouter as Router } from 'react-router-dom';

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

const store = createStore(
  rootReducer,
  composeEnhancers(installReduxLoop()),
);

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
