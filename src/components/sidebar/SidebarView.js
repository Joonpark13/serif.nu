import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Search from './search/Search';
import Cart from './cart/Cart';
import Browse from './browse/Browse';

export const styles = {
  wrapper: {
    height: 'calc(100vh - 64px)', // 64px is height of TopBar
    overflow: 'auto',
  },
  tabWidth: {
    minWidth: 0,
  },
};

function SidebarView({ classes }) {
  const [value, setValue] = useState('search');

  return (
    <div className={classes.wrapper}>
      <Tabs
        value={value}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event, newValue) => setValue(newValue)}
        variant="fullWidth"
      >
        <Tab value="search" label="Search" className={classes.tabWidth} />
        <Tab value="browse" label="Browse" className={classes.tabWidth} />
        <Tab value="cart" label="Cart" className={classes.tabWidth} />
      </Tabs>
      {value === 'search' && <Search />}
      {value === 'browse' && <Browse />}
      {value === 'cart' && <Cart />}
    </div>
  );
}

SidebarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { SidebarView as UnstyledSidebarView };
export default withStyles(styles)(SidebarView);
