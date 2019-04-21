import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import SearchContainer from './search/SearchContainer';
import CartContainer from './cart/CartContainer';
import BrowseContainer from './browse/BrowseContainer';

export const styles = {
  wrapper: {
    height: 'calc(100vh - 64px)', // 64px is height of TopBar
    overflow: 'auto',
  },
  tabWidth: {
    minWidth: 0,
  },
};

class SidebarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'search',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.wrapper}>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          onChange={this.handleChange}
          variant="fullWidth"
        >
          <Tab value="search" label="Search" className={classes.tabWidth} />
          <Tab value="browse" label="Browse" className={classes.tabWidth} />
          <Tab value="cart" label="Cart" className={classes.tabWidth} />
        </Tabs>
        {value === 'search' && <SearchContainer />}
        {value === 'browse' && <BrowseContainer />}
        {value === 'cart' && <CartContainer />}
      </div>
    );
  }
}

SidebarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { SidebarView as UnstyledSidebarView };
export default withStyles(styles)(SidebarView);
