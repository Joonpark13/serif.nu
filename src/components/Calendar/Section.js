import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getDurationInHours, getFormattedClassSchedule } from 'util/time';
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
    height: ({ hour, dow, section }) => {
      const schedule = getScheduleObjGivenHourAndDow(section.schedule, hour, dow);
      const durationInHours = getDurationInHours(schedule);
      const heightInPercent = Math.round(durationInHours * 100);
      return `${heightInPercent}%`;
    },
    width: '97%',
    backgroundColor: ({ section }) => section.color,
  },
  container: {
    margin: '3px',
  },
  text: {
    color: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

function Section({ classes, hour, dow, section }) {
  const schedule = getScheduleObjGivenHourAndDow(section.schedule, hour, dow);
  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="caption" className={classes.text}>
            {getFormattedClassSchedule(schedule, false, false)}
          </Typography>

          <Typography variant="caption" className={classes.text}>
            {`${section.subjectId} ${section.courseId}`}
          </Typography>
        </div>

        <Typography variant="subtitle2" className={`${classes.text} ${classes.name}`} noWrap>
          {section.name}
        </Typography>
      </div>
    </Paper>
  );
}

Section.propTypes = {
  hour: PropTypes.number.isRequired,
  dow: PropTypes.string.isRequired,
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Section as UnstyledSection };
export default withStyles(styles)(Section);
