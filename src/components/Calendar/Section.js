import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ hour, section }) => {
      const schedule = section.schedule.find(time => time.start.hour === hour);
      /* eslint-disable-next-line prefer-destructuring */
      const minute = schedule.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
  },
};

function Section({ classes, section }) {
  return (
    <Paper className={classes.paper}>
      {section.course}
    </Paper>
  );
}

Section.propTypes = {
  hour: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Section as UnstyledSection };
export default withStyles(styles)(Section);
