import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getHours, parseMeetingTime } from './calendar-helpers';
import HoursColumn from './HoursColumn';
import DowColumn from './DowColumn';

export const styles = {
  calendarRoot: {
    height: 'calc(100vh - 64px)', // 64px is height of TopBar
    display: 'flex',
  },
  dowColumns: {
    display: 'flex',
    width: '100%',
  },
};

const hours = getHours();
const dows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];


export function getSectionsForDow(dow, sections) {
  // sections: [{
  //   class_mtg_info: [{
  //     meet_t: MoWe 11:00AM - 11:50AM
  //   }]
  // }]
  return sections.filter(section => section.class_mtg_info.some((mtgInfo) => {
    const mtgTime = parseMeetingTime(mtgInfo.meet_t);
    if (mtgTime === 'TBA') return false; // TODO: Handle unscheduled courses
    return mtgTime.dow.some(mtgTimeDow => dow.slice(0, 2) === mtgTimeDow);
    // mtgTimeDow will be 'Mo' and the dow param of the function will be 'Mon'
  }));
}

function CalendarView({ sections, classes }) {
  return (
    <div className={classes.calendarRoot}>
      <HoursColumn hours={hours} />

      <div className={classes.dowColumns}>
        {dows.map(dow => (
          <DowColumn key={dow} dow={dow} sections={getSectionsForDow(dow, sections)} />
        ))}
      </div>
    </div>
  );
}

CalendarView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { CalendarView as UnstyledCalendarView };

export default withStyles(styles)(CalendarView);
