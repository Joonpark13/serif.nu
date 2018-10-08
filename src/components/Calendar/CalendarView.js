import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { northwesternRichBlack10 } from 'util/colors';

const hours = [];
for (let i = 8; i <= 22; i++) {
  hours.push(i);
}

const columnBorderStyle = `1px solid ${northwesternRichBlack10}`;
const dowColumnHeaderHeight = 24;
const cellMinHeight = 50;
const columnHeight = `calc(100% - ${dowColumnHeaderHeight}px)`;
// cellMinHeight + 1 for border height
const columnMinHeight = (cellMinHeight + 1) * hours.length + dowColumnHeaderHeight;

export const styles = {
  calendarRoot: {
    height: 'calc(100vh - 64px)', // 64px is height of TopBar
    display: 'flex',
  },
  hoursColumnContainer: {
    minHeight: columnMinHeight,
    borderRight: columnBorderStyle,
  },
  hoursColumn: {
    width: 50,
    height: columnHeight,
    display: 'flex',
    flexDirection: 'column',
  },
  hoursSpacer: {
    height: dowColumnHeaderHeight,
  },
  hours: {
    flexGrow: 1,
    minHeight: cellMinHeight,
    borderBottom: '1px solid white',
  },
  dowColumns: {
    display: 'flex',
    width: '100%',
  },
  dowColumn: {
    flexGrow: 1,
    borderRight: columnBorderStyle,
    minHeight: columnMinHeight,
  },
  dowHeader: {
    borderBottom: columnBorderStyle,
  },
  calendarColumn: {
    height: columnHeight,
    display: 'flex',
    flexDirection: 'column',
  },
  calendarCell: {
    flexGrow: 1,
    borderBottom: columnBorderStyle,
    minHeight: cellMinHeight,
  },
};

/*
 * 0 is 12am
 * 1 - 11 gets 'am'
 * 12 gets 'pm'
 * 13 - 23 gets -12, then 'pm'
 */
export function formatHour(hour) {
  if (hour === 0 || hour === 24) {
    return '12am';
  }
  if (hour <= 11) {
    return `${hour}am`;
  }
  if (hour === 12) {
    return '12pm';
  }
  if (hour <= 23) {
    return `${hour - 12}pm`;
  }
  throw new RangeError('Invalid input. hour must be in the range [0, 24]');
}

function CalendarView({ classes }) {
  const dows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className={classes.calendarRoot}>
      <div className={classes.hoursColumnContainer}>
        <div className={classes.hoursSpacer} />
        <div className={classes.hoursColumn}>
          {hours.map(hour => (
            <Typography key={hour} align="right" className={classes.hours} variant="body1">
              {formatHour(hour)}
            </Typography>
          ))}
        </div>
      </div>

      <div className={classes.dowColumns}>
        {dows.map(dow => (
          <div key={dow} className={classes.dowColumn}>
            <Typography className={classes.dowHeader} align="center" variant="body2">
              {dow}
            </Typography>

            <div className={classes.calendarColumn}>
              {hours.map(hour => <div key={hour} className={classes.calendarCell} />)}
            </div>
          </div>
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
