import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import SearchContainer from './SearchContainer';
import SchoolsContainer from './SchoolsContainer';

export const styles = {
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
      <div>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          onChange={this.handleChange}
          fullWidth
        >
          <Tab value="search" label="Search" className={classes.tabWidth} />
          <Tab value="browse" label="Browse" className={classes.tabWidth} />
        </Tabs>
        {value === 'search' && <SearchContainer />}
        {value === 'browse' && <SchoolsContainer />}
      </div>
    );
  }
}

SidebarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { SidebarView as UnstyledSidebarView };
export default withStyles(styles)(SidebarView);
