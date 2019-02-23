import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getDurationInHours, getFormattedClassEvent } from 'util/time';

export const MAX_WIDTH_PERCENT = 97;

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ section }) => {
      const minute = section.event.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
    left: ({ section }) => `${MAX_WIDTH_PERCENT * section.columnWidth * section.column}%`,
    height: ({ section }) => {
      const durationInHours = getDurationInHours(section.event);
      const heightInPercent = Math.round(durationInHours * 100);
      return `${heightInPercent}%`;
    },
    width: ({ section }) => `${MAX_WIDTH_PERCENT * section.columnWidth}%`,
    backgroundColor: ({ section }) => section.color,
    overflow: 'hidden',
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
    flexWrap: 'wrap',
  },
};

function Section({ classes, section }) {
  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="caption" className={classes.text}>
            {getFormattedClassEvent(section.event)}
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
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Section as UnstyledSection };
export default withStyles(styles)(Section);
