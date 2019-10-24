import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {
  HOURS,
  columnBorderStyle,
  columnMinHeight,
  columnHeight,
} from './calendar-constants';
import HourCell from './HourCell';

const useStyles = makeStyles({
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
});

/* istanbul ignore next */
function getDisplayDow(dow) {
  switch (dow) {
    case 'Mo':
      return 'Mon';
    case 'Tu':
      return 'Tue';
    case 'We':
      return 'Wed';
    case 'Th':
      return 'Thu';
    case 'Fr':
      return 'Fri';
    default:
      return '';
  }
}

export default function DowColumn({ dow }) {
  const classes = useStyles();
  return (
    <div className={classes.dowColumn}>
      <Typography className={classes.dowHeader} align="center" variant="body1">
        {getDisplayDow(dow)}
      </Typography>

      <div className={classes.calendarColumn}>
        {HOURS.map(
          hour => <HourCell key={hour} hour={hour} dow={dow} />,
        )}
      </div>
    </div>
  );
}

DowColumn.propTypes = {
  dow: PropTypes.string.isRequired,
};
