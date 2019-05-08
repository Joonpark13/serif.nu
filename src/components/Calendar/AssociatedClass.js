import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedEventTime, getDurationInHours } from 'util/time';
import Section from 'components/common/Section';

export const MAX_WIDTH_PERCENT = 97;

export const styles = {
  paper: {
    position: 'absolute',
    top: ({ associatedClass }) => {
      const minute = associatedClass.event.start.minute;
      const offset = Math.round(minute / 60 * 100);
      return `${offset}%`;
    },
    left: ({ associatedClass }) => `${MAX_WIDTH_PERCENT * associatedClass.columnWidth * associatedClass.column}%`,
    height: ({ associatedClass }) => {
      const durationInHours = getDurationInHours(associatedClass.event);
      const heightInPercent = Math.round(durationInHours * 100);
      return `${heightInPercent}%`;
    },
    width: ({ associatedClass }) => `${MAX_WIDTH_PERCENT * associatedClass.columnWidth}%`,
    backgroundColor: ({ associatedClass }) => associatedClass.color,
    overflow: 'hidden',
    zIndex: ({ isPreview }) => isPreview ? 2 : 1,
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

function AssociatedClass({ classes, associatedClass, section }) {
  const leftHeaderContent = getFormattedEventTime(associatedClass.event);
  const rightHeaderContent = `${section.subjectId} ${section.courseId}`;
  const associatedClassTitle = `${associatedClass.type} - ${section.name}`;
  return (
    <Section
      classes={classes}
      leftHeaderContent={leftHeaderContent}
      rightHeaderContent={rightHeaderContent}
      sectionName={associatedClassTitle}
    />
  );
}

AssociatedClass.propTypes = {
  associatedClass: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { AssociatedClass as UnstyledAssociatedClass };
export default withStyles(styles)(AssociatedClass);
