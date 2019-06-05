import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import { Dialog, DialogActions, Typography, Button, Divider } from '@material-ui/core';

export const styles = {
  dialog: {
    top: '12.5%',
    left: '12.5%',
    width: '500px',
    padding: '10px',
  },
};

function ClassModal({
  showDialog, toggleDialog, classes, section, associatedClass, removeSection,
}) {
  const subtitle = `${section.subjectId} ${section.courseId} Section ${section.sectionNumber}`;
  const associatedClassSchedule = associatedClass && (
    <div>
      <Typography>{getFormattedClassSchedule(associatedClass.schedule)}</Typography>
      <Typography>{associatedClass.schedule.location}</Typography>
    </div>
  );
  const sectionSchedules = section.schedules.map(schedule => (
    <div key={JSON.stringify(schedule)}>
      <Typography>{getFormattedClassSchedule(schedule)}</Typography>
      <Typography>{schedule.location}</Typography>
    </div>
  ));

  return (
    <Dialog
      open={showDialog}
      onClose={toggleDialog}
      aria-labelledby="simple"
      aria-describedby="simple-dialog-description"
    >
      <div className={classes.dialog}>
        <Typography gutterBottom variant="h5">
          {associatedClass ? `${associatedClass.type} - ` : ''}
          {section.name}
        </Typography>
        <Divider />
        <br />

        <Typography variant="subtitle1">
          {subtitle}
        </Typography>
        <br />

        {associatedClass ? associatedClassSchedule : sectionSchedules}

        {section.instructors.map(
          instructor => <Typography key={instructor}>{instructor}</Typography>,
        )}
        <br />

        {section.descriptions.map(description => (
          <div key={JSON.stringify(description)}>
            <Typography variant="h6">{description.name}</Typography>
            <Typography gutterBottom>{description.value}</Typography>
            <br />
          </div>
        ))}
      </div>
      <DialogActions>
        <Button onClick={() => removeSection(section.id, section.color)}>Remove</Button>
        <Button onClick={toggleDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

ClassModal.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  associatedClass: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  showDialog: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
};

ClassModal.defaultProps = {
  associatedClass: null,
};

export { ClassModal as UnstyledClassModal };
export default withStyles(styles)(ClassModal);
