import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

function TopBar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton aria-label="Navigation">
          <MenuIcon />
        </IconButton>

        <Typography variant="title">Serif.nu</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
