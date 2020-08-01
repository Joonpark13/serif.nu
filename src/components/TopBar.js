import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
// Code left for educational reference
// import { currentTerm } from 'util/data';

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
});

// Code left for educational reference
// const termName = currentTerm.name;

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

        {/* Code left for educational reference */}
        {/* <div className={classes.topBarSideSections}>
          <Typography className={classes.title}>
            Term:
            {' '}
            {termName}
          </Typography>
        </div> */}
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  menuAction: PropTypes.func.isRequired,
};
