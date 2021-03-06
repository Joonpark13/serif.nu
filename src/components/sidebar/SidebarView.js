import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Search from './search/Search';
import Cart from './cart/Cart';
import Browse from './browse/Browse';
import Custom from './custom/Custom';

const useStyles = makeStyles({
  wrapper: {
    height: 'calc(100vh - 64px)', // 64px is height of TopBar
    overflow: 'auto',
  },
  tabWidth: {
    minWidth: 0,
  },
});

export default function SidebarView() {
  const classes = useStyles();
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
        <Tab value="custom" label="Custom" className={classes.tabWidth} />
        <Tab value="cart" label="Cart" className={classes.tabWidth} />
      </Tabs>
      {value === 'search' && <Search />}
      {value === 'browse' && <Browse />}
      {value === 'custom' && <Custom />}
      {value === 'cart' && <Cart />}
    </div>
  );
}
