import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4E2A84',
    },
    secondary: {
      main: '#FFC520',
    },
  },
});

function Index() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
