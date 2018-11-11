import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const topBarTextColor = 'white';

export const styles = {
  title: {
    color: topBarTextColor,
  },
  icon: {
    color: topBarTextColor,
  },
};

function TopBar({ classes, menuAction }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="Navigation" onClick={menuAction}>
          <MenuIcon className={classes.icon} />
        </IconButton>

        <Typography className={classes.title} variant="h6">Serif.nu</Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  menuAction: PropTypes.func.isRequired,
};

export { TopBar as UnstyledTopBar };

export default withStyles(styles)(TopBar);
