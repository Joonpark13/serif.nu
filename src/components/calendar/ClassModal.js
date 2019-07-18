import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

export const useStyles = makeStyles({
  dialog: {
    top: '12.5%',
    left: '12.5%',
    width: '500px',
    padding: '10px',
  },
  noBorder: {
    margin: '0px',
  },
});

export default function ClassModal({
  showDialog, toggleDialog, section, associatedClass, removeSection,
}) {
  const classes = useStyles();
  const subtitle = `${section.subjectId} ${section.courseId} Section ${section.sectionNumber}`;
  const associatedClassSchedule = associatedClass && (
    <div>
      <DialogContentText className={classes.noBorder}>
        {getFormattedClassSchedule(associatedClass.schedule)}
      </DialogContentText>
      <DialogContentText>{associatedClass.schedule.location}</DialogContentText>
    </div>
  );
  const sectionSchedules = section.schedules.map(schedule => (
    <div key={JSON.stringify(schedule)}>
      <DialogContentText className={classes.noBorder}>
        {getFormattedClassSchedule(schedule)}
      </DialogContentText>
      <DialogContentText>{schedule.location}</DialogContentText>
    </div>
  ));

  const { enqueueSnackbar } = useSnackbar();
  const message = 'Class successfully removed';
  const handleClick = () => {
    removeSection(section.id, section.color);
    enqueueSnackbar(message, {
      variant: 'success',
    });
  };

  return (
    <Dialog
      open={showDialog}
      onClose={toggleDialog}
      aria-labelledby="simple"
      aria-describedby="simple-dialog-description"
    >
      <div className={classes.dialog}>
        <DialogTitle variant="h5">
          {associatedClass ? `${associatedClass.type} - ` : ''}
          {section.name}
        </DialogTitle>

        <DialogContent>
          <DialogContentText variant="subtitle1">
            {subtitle}
          </DialogContentText>
          {associatedClass ? associatedClassSchedule : sectionSchedules}


          {section.instructors.map(instructor => (
            <DialogContentText className={classes.noBorder} key={instructor}>
              {instructor}
            </DialogContentText>
          ))}
          <br />

          {section.descriptions.map(description => (
            <div key={JSON.stringify(description)}>
              <DialogContentText className={classes.noBorder} variant="h6">{description.name}</DialogContentText>
              <DialogContentText>{description.value}</DialogContentText>
            </div>
          ))}
        </DialogContent>
      </div>
      <DialogActions>
        <Button onClick={handleClick}>Remove</Button>
        <Button onClick={toggleDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

ClassModal.propTypes = {
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  associatedClass: PropTypes.objectOf(PropTypes.any),
  showDialog: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
};

ClassModal.defaultProps = {
  associatedClass: null,
};
