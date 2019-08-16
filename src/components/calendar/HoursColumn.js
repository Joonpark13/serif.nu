import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import {
  columnBorderStyle,
  columnMinHeight,
  dowColumnHeaderHeight,
  cellMinHeight,
  columnHeight,
} from './calendar-constants';

const useStyles = makeStyles({
  hoursColumnContainer: {
    minHeight: columnMinHeight,
    borderRight: columnBorderStyle,
  },
  hoursSpacer: {
    height: dowColumnHeaderHeight,
  },
  hoursColumn: {
    width: 50,
    height: columnHeight,
    display: 'flex',
    flexDirection: 'column',
  },
  hours: {
    flexGrow: 1,
    minHeight: cellMinHeight,
    borderBottom: '1px solid white',
  },
});

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

export default function HoursColumn({ hours }) {
  const classes = useStyles();
  return (
    <div className={classes.hoursColumnContainer}>
      <div className={classes.hoursSpacer} />
      <div className={classes.hoursColumn}>
        {hours.map(hour => (
          <Typography key={hour} align="right" className={classes.hours}>
            {formatHour(hour)}
          </Typography>
        ))}
      </div>
    </div>
  );
}

HoursColumn.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.number).isRequired,
};
