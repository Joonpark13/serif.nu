import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from 'components/App';
import rootReducer from 'reducers';
import { northwesternPurple, northwesternBrightOrange } from 'util/colors';

// https://material-ui.com/css-in-js/basics/#migration-for--material-ui-core-users
/* eslint-disable-next-line import/newline-after-import */
import { install } from '@material-ui/styles';
install();

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
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

function Index() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  );
}

const StyledIndex = injectSheet(styles)(Index);

ReactDOM.render(
  <StyledIndex />,
  document.getElementById('root'),
);
