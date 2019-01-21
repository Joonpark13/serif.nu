import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  columnBorderStyle,
  columnMinHeight,
  columnHeight,
} from './calendar-constants';
import { getHours } from './calendar-helpers';
import HourCell from './HourCell';

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

const hours = getHours();

export function getSectionsForHour(hour, sections) {
  // sections: [{
  //   schedule: [{
  //     dow: ['Mo', 'We'],
  //     start: {
  //       hour: 13,
  //       minute: 0,
  //     },
  //     end: {
  //       hour: 13,
  //       minute: 50,
  //     },
  //   }],
  // }]
  return sections.filter(
    section => section.schedule.some(
      schedule => schedule.start.hour === hour,
    ),
  );
}

function DowColumn({ dow, sections, classes }) {
  return (
    <div className={classes.dowColumn}>
      <Typography className={classes.dowHeader} align="center" variant="body1">
        {dow}
      </Typography>

      <div className={classes.calendarColumn}>
        {hours.map(
          hour => <HourCell key={hour} hour={hour} sections={getSectionsForHour(hour, sections)} />,
        )}
      </div>
    </div>
  );
}

DowColumn.propTypes = {
  dow: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { DowColumn as UnstyledDowColumn };

export default withStyles(styles)(DowColumn);
