import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { sectionPropType, associatedClassPropType } from 'util/prop-types';
import { getFormattedEventTime, getDurationInHours } from 'util/time';
import Section from 'components/common/Section';
import ClassModal from './ClassModal';

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
    cursor: ({ isPreview }) => isPreview ? 'default' : 'pointer',
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

const useStyles = makeStyles(styles);

export default function CalendarSection({ section, isPreview, associatedClass }) {
  const [showDialog, setShowDialog] = useState(false);

  const classes = useStyles({ section, isPreview });

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  const handleClick = () => {
    if (!isPreview) {
      toggleDialog();
    }
  };

  const leftHeaderContent = getFormattedEventTime(section.event);
  const rightHeaderContent = `${section.subjectId} ${section.courseId}`;

  return (
    <div>
      <Section
        onClick={handleClick}
        classes={classes}
        leftHeaderContent={leftHeaderContent}
        rightHeaderContent={rightHeaderContent}
        sectionName={section.topic === '' ? section.name : section.topic}
      />
      <ClassModal
        section={section}
        showDialog={showDialog}
        toggleDialog={toggleDialog}
        associatedClass={associatedClass}
      />
    </div>
  );
}

CalendarSection.propTypes = {
  section: PropTypes.shape(sectionPropType).isRequired,
  isPreview: PropTypes.bool,
  associatedClass: PropTypes.shape(associatedClassPropType),
};

CalendarSection.defaultProps = {
  isPreview: false,
  associatedClass: null,
};
