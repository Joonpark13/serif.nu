import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  HOURS,
  columnBorderStyle,
  columnMinHeight,
  columnHeight,
} from './calendar-constants';
import HourCellContainer from './HourCellContainer';

export const styles = {
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
};

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

function DowColumn({ dow, classes }) {
  return (
    <div className={classes.dowColumn}>
      <Typography className={classes.dowHeader} align="center" variant="body1">
        {getDisplayDow(dow)}
      </Typography>

      <div className={classes.calendarColumn}>
        {HOURS.map(
          hour => <HourCellContainer key={hour} hour={hour} dow={dow} />,
        )}
      </div>
    </div>
  );
}

DowColumn.propTypes = {
  dow: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { DowColumn as UnstyledDowColumn };

export default withStyles(styles)(DowColumn);
