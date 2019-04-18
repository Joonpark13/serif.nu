import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { getFormattedClassSchedule } from 'util/time';

export const styles = {
  sectionTitle: {
    fontWeight: 'bold',
  },
};

function Section({ addSection, section, disabled, classes }) {
  return (
    <ListItem
      key={section.id}
      button
      onClick={() => addSection(section)}
      disabled={disabled}
    >
      <ListItemText>
        <Typography variant="h6" className={classes.sectionTitle}>
          {`Section ${section.sectionNumber}`}
        </Typography>

        {section.topic && <Typography>{section.topic}</Typography>}

        {section.schedule.map((scheduleObj, index) => (
          /* eslint-disable react/no-array-index-key */
          <Typography key={index}>
            {getFormattedClassSchedule(scheduleObj)}
          </Typography>
          /* eslint-enable react/no-array-index-key */
        ))}

        <Typography>{section.schedule[0].location}</Typography>

        <Typography>
          {section.instructors.map((teacher, idx) => (
            `${teacher}${idx !== section.instructors.length - 1 ? ', ' : ''}`))
          }
        </Typography>
      </ListItemText>
    </ListItem>
  );
}

Section.propTypes = {
  addSection: PropTypes.func.isRequired,
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

Section.defaultProps = {
  disabled: false,
};

export { Section as UnstyledSection };
export default withStyles(styles)(Section);
