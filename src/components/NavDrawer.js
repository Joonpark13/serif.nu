import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

/* istanbul ignore next */
function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

function NavDrawer({ isOpen, closeFunc }) {
  return (
    <Drawer onClose={closeFunc} open={isOpen}>
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
        <ListItemLink to="/report" onClick={closeFunc}>
          <ListItemText primary="Report a Bug" />
        </ListItemLink>
        <ListItemLink to="/contact" onClick={closeFunc}>
          <ListItemText primary="Contact" />
        </ListItemLink>
      </List>
    </Drawer>
  );
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};

export default NavDrawer;
