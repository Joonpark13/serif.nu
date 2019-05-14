import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const topBarTextColor = 'white';

export const styles = {
  title: {
    color: topBarTextColor,
  },
  icon: {
    color: topBarTextColor,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topBarLeftSection: {
    display: 'flex',
    alignItems: 'center',
  },
};

function TopBar({ classes, menuAction }) {
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.topBarLeftSection}>
          <IconButton aria-label="Navigation" onClick={menuAction}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Typography className={classes.title} variant="h5">Serif.nu</Typography>
        </div>

        <Typography className={classes.title}>Term: Fall 2019</Typography>
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
