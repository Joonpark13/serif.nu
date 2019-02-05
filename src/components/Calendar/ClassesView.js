import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import CalendarView from './CalendarView';
import UnscheduledClasses from './UnscheduledClasses';

export const styles = {
  tabWidth: {
    minWidth: 0,
  },
};

class ClassesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'calendar',
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
        >
          <Tab value="calendar" label="Calendar" className={classes.tabWidth} />
          <Tab value="unscheduled" label="Unscheduled Classes" className={classes.tabWidth} />
        </Tabs>
        {value === 'calendar' && <CalendarView />}
        {value === 'unscheduled' && <UnscheduledClasses />}
      </div>
    );
  }
}

ClassesView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { ClassesView as UnstyledClassesView };
export default withStyles(styles)(ClassesView);
