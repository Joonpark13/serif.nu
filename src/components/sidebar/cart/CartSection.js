import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import Section from 'components/common/Section';
import ClassModal from 'components/calendar/ClassModal';

export const styles = {
  paper: {
    backgroundColor: ({ section }) => section.color,
    overflow: 'hidden',
    margin: '10px',
    cursor: 'pointer',
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

export default function CartSection({ section }) {
  const classes = useStyles({ section });
  const [showDialog, setShowDialog] = useState(false);

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  let leftHeaderContent;
  if (section.schedules.length > 1) {
    leftHeaderContent = section.schedules
      .map(schedule => getFormattedClassSchedule(schedule))
      .reduce(
        (resultStr, formattedStr) => `${resultStr}, ${formattedStr}`,
      );
  } else {
    leftHeaderContent = getFormattedClassSchedule(section.schedules[0]);
  }
  const rightHeaderContent = `${section.subjectId} ${section.courseId}`;

  return (
    <React.Fragment>
      <Section
        onClick={toggleDialog}
        classes={classes}
        leftHeaderContent={leftHeaderContent}
        rightHeaderContent={rightHeaderContent}
        sectionName={section.name}
      />
      <ClassModal
        section={section}
        showDialog={showDialog}
        toggleDialog={toggleDialog}
      />
    </React.Fragment>
  );
}

CartSection.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired, // TODO
};
