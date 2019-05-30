import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { getFormattedClassSchedule } from 'util/time';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export const styles = {
  dialog: {
    top: '12.5%',
    left: '12.5%',
    width: '500px',
    padding: '10px',
  },
};

function ClassModal({ showDialog, toggleDialog, classes, section, removeSection }) {
  return (
    <Dialog
      open={showDialog}
      onClose={toggleDialog}
      aria-labelledby="simple"
      aria-describedby="simple-dialog-description"
    >
      <div className={classes.dialog}>
        <Typography gutterBottom variant="h5">
          {`${section.subjectId} ${section.courseId} Section ${section.sectionNumber}`}
        </Typography>
        <Divider />
        <br />

        {section.schedules.map(schedule => (
          <div key={JSON.stringify(schedule)}>
            <Typography>{getFormattedClassSchedule(schedule)}</Typography>
            <Typography>{schedule.location}</Typography>
          </div>
        ))}
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  showDialog: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
};

export { ClassModal as UnstyledClassModal };
export default withStyles(styles)(ClassModal);
