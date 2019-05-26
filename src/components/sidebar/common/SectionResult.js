import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { getFormattedClassSchedule, isUnscheduled } from 'util/time';

export const styles = {
  sectionTitle: {
    fontWeight: 'bold',
  },
};

function SectionResult({ addSection, sectionHover, sectionHoverOff, section, disabled, classes }) {
  const sectionIsUnscheduled = section.schedules.some(isUnscheduled);

  return (
    <ListItem
      key={section.id}
      button
      onClick={() => addSection(section)}
      onMouseEnter={() => sectionHover(section)}
      onMouseLeave={sectionHoverOff}
      disabled={disabled || sectionIsUnscheduled}
    >
      <ListItemText>
        <Typography variant="h6" className={classes.sectionTitle}>
          {`Section ${section.sectionNumber}`}
        </Typography>

        {section.topic && <Typography>{section.topic}</Typography>}

        {section.schedules.map((scheduleObj, index) => (
          /* eslint-disable react/no-array-index-key */
          <Typography color={sectionIsUnscheduled ? 'error' : undefined} key={index}>
            {getFormattedClassSchedule(scheduleObj)}
          </Typography>
          /* eslint-enable react/no-array-index-key */
        ))}

        <Typography>{section.schedules[0].location}</Typography>

        <Typography>
          {section.instructors.map((teacher, idx) => (
            `${teacher}${idx !== section.instructors.length - 1 ? ', ' : ''}`))
          }
        </Typography>
      </ListItemText>
    </ListItem>
  );
}

SectionResult.propTypes = {
  addSection: PropTypes.func.isRequired,
  sectionHover: PropTypes.func.isRequired,
  sectionHoverOff: PropTypes.func.isRequired,
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

SectionResult.defaultProps = {
  disabled: false,
};

export { SectionResult as UnstyledSectionResult };
export default withStyles(styles)(SectionResult);
