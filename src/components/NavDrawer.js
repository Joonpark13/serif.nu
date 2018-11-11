import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function NavDrawer({ isOpen, closeFunc }) {
  return (
    <Drawer onClose={closeFunc} open={isOpen}>
      <List>
        <ListItem button>
          <ListItemText primary="Serif.nu" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Report a Bug" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
};

export default NavDrawer;
