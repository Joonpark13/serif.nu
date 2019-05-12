import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { HOURS, DOWS } from './calendar-constants';
import HoursColumn from './HoursColumn';
import DowColumn from './DowColumn';

export const styles = {
  calendarRoot: {
    height: 'calc(100vh - 64px)',
    // 64px is height of TopBar
    display: 'flex',
  },
  dowColumns: {
    display: 'flex',
    width: '100%',
  },
};

function CalendarView({ classes }) {
  return (
    <div className={classes.calendarRoot}>
      <HoursColumn hours={HOURS} />

      <div className={classes.dowColumns}>
        {DOWS.map(dow => (
          <DowColumn key={dow} dow={dow} />
        ))}
      </div>
    </div>
  );
}

CalendarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { CalendarView as UnstyledCalendarView };

export default withStyles(styles)(CalendarView);
