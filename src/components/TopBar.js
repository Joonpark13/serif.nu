import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { currentTerm } from 'util/data';

const topBarTextColor = 'white';

const useStyles = makeStyles({
  title: {
    color: topBarTextColor,
  },
  icon: {
    color: topBarTextColor,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: '2',
  },
  topBarLeftSection: {
    display: 'flex',
    alignItems: 'center',
  },
});

const termName = currentTerm.name;

export default function TopBar({ menuAction }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.topBarLeftSection}>
          <IconButton aria-label="Navigation" onClick={menuAction}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Typography className={classes.title} variant="h5">Serif.nu</Typography>
        </div>

        <Typography className={classes.title}>
          Term:
          {' '}
          {termName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  menuAction: PropTypes.func.isRequired,
};
