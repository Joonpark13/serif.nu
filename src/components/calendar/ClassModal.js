import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const styles = {
  dialog: {
    top: '12.5%',
    left: '12.5%',
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
        <Typography variant="h5">
          {`${section.subjectId} ${section.courseId} Section ${section.sectionNumber}`}
        </Typography>
      </div>
      <DialogActions>
        <Button onClick={() => removeSection(section.id, section.color)}> Remove </Button>
        <Button onClick={toggleDialog}> Cancel </Button>
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
