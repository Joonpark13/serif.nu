import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import { sectionPropType, associatedClassPropType } from 'util/prop-types';
import { getFormattedClassSchedule } from 'util/time';
import { removeSection } from 'actions';

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

export default function ClassModal({ showDialog, toggleDialog, section, associatedClass }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleClick = () => {
    dispatch(removeSection(section.id, section.color));
    enqueueSnackbar('Class successfully removed', {
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
              {description.value.split('<br/>').map(description2 => (
                <DialogContentText key={description2}>
                  {description2}
                </DialogContentText>
              ))}
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
  associatedClass: PropTypes.shape(associatedClassPropType),
  section: PropTypes.shape(sectionPropType).isRequired,
  showDialog: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

ClassModal.defaultProps = {
  associatedClass: null,
};
