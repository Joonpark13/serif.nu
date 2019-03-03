import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import Section from 'components/common/Section';

export const styles = {
  paper: {
    backgroundColor: ({ section }) => section.color,
    overflow: 'hidden',
    margin: '10px',
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

function CartSection({ classes, section }) {
  let leftHeaderContent;
  if (section.schedule.length > 1) {
    leftHeaderContent = section.schedule
      .map(schedule => getFormattedClassSchedule(schedule))
      .reduce(
        (resultStr, formattedStr) => `${resultStr}, ${formattedStr}`,
      );
  } else {
    leftHeaderContent = getFormattedClassSchedule(section.schedule[0]);
  }
  const rightHeaderContent = `${section.subjectId} ${section.courseId}`;
  return (
    <Section
      classes={classes}
      leftHeaderContent={leftHeaderContent}
      rightHeaderContent={rightHeaderContent}
      sectionName={section.name}
    />
  );
}

CartSection.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { CartSection as UnstyledCartSection };
export default withStyles(styles)(CartSection);
