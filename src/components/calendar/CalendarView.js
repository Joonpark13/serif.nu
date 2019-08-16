import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { HOURS, DOWS } from './calendar-constants';
import HoursColumn from './HoursColumn';
import DowColumn from './DowColumn';

const useStyles = makeStyles({
  calendarRoot: {
    height: 'calc(100vh - 64px)',
    // 64px is height of TopBar
    display: 'flex',
  },
  dowColumns: {
    display: 'flex',
    width: '100%',
  },
});

export default function CalendarView() {
  const classes = useStyles();
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
