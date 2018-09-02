import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import injectSheet from 'react-jss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const styles = {
  '@global body': {
    margin: 0,
  },
};

const theme = createMuiTheme({
  palette: {
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

const StyledIndex = injectSheet(styles)(Index);

ReactDOM.render(
  <StyledIndex />,
  document.getElementById('root'),
);
