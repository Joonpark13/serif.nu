import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { currentTerm } from 'util/data';
import GoogleCalendarButton from './GoogleCalendarButton';

const topBarTextColor = 'white';

const useStyles = makeStyles({
  title: {
    color: topBarTextColor,
  },
  titleLink: {
    textDecoration: 'none',
  },
  icon: {
    color: topBarTextColor,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: '3',
  },
  topBarSideSections: {
    display: 'flex',
    alignItems: 'center',
  },
  customEvent: {
    marginRight: '20px',
  },
});

const termName = currentTerm.name;

export default function TopBar({ menuAction }) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.topBarSideSections}>
          <IconButton aria-label="Navigation" onClick={menuAction}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Link to="/" className={classes.titleLink}>
            <Typography className={classes.title} variant="h5">Serif.nu</Typography>
          </Link>
        </div>

        <div className={classes.topBarSideSections}>
          <GoogleCalendarButton />
          <Typography className={classes.title}>
            <Button variant="contained" color="primary" className={classes.customEvent}>Add Custom Event</Button>
            Term:
            {' '}
            {termName}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  menuAction: PropTypes.func.isRequired,
};
