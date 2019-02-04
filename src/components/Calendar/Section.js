import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { getScheduleObjGivenHourAndDow } from './calendar-helpers';

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ hour, dow, section }) => {
      const schedule = getScheduleObjGivenHourAndDow(section.schedule, hour, dow);
      const minute = schedule.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
  },
};

function Section({ classes, section }) {
  return (
    <Paper className={classes.paper}>
      {section.courseId}
    </Paper>
  );
}

Section.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  hour: PropTypes.number.isRequired,
  dow: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Section as UnstyledSection };
export default withStyles(styles)(Section);
