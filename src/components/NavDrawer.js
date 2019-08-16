import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  legalLink: {
    margin: '5px auto',
  },
});

/* istanbul ignore next */
function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export default function NavDrawer({ isOpen, closeFunc }) {
  const classes = useStyles();
  return (
    <Drawer onClose={closeFunc} open={isOpen}>
      <div className={classes.drawer}>
        <List>
          <ListItemLink to="/" onClick={closeFunc}>
            <ListItemText primary="Serif.nu" />
          </ListItemLink>
          <ListItemLink to="/about" onClick={closeFunc}>
            <ListItemText primary="About" />
          </ListItemLink>
          <ListItemLink to="/faq" onClick={closeFunc}>
            <ListItemText primary="FAQ" />
          </ListItemLink>
          <ListItemLink to="/bugs" onClick={closeFunc}>
            <ListItemText primary="Report a Bug" />
          </ListItemLink>
          <ListItemLink to="/contact" onClick={closeFunc}>
            <ListItemText primary="Contact" />
          </ListItemLink>
        </List>

        <div className={classes.legalLink}>
          <Link to="/legal" onClick={closeFunc}>
            <Typography variant="caption">
              Legal notices
            </Typography>
          </Link>
        </div>
      </div>
    </Drawer>
  );
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
