import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const styles = {
  browseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionName: {
    padding: '10px 16px',
  },
  backButton: {
    padding: '10px 16px',
  },
};

function BrowseHeader({ currentBrowseLevel, selectedSchoolId, selectedSubjectId, classes, back }) {
  let previousSelectionName;
  switch (currentBrowseLevel) {
    case 'subject':
      previousSelectionName = selectedSchoolId;
      break;
    case 'course':
      previousSelectionName = selectedSubjectId;
      break;
    default:
      break;
  }

  function goBackLevel() {
    let backTo = 'school';
    if (currentBrowseLevel === 'course') backTo = 'subject';

    back(backTo);
  }

  return (
    <div className={classes.browseHeader}>
      <div className={classes.selectionName}>
        <Typography variant="h5">
          {previousSelectionName}
        </Typography>
      </div>

      <div className={classes.backButton}>
        <Button onClick={goBackLevel}>Back</Button>
      </div>
    </div>
  );
}

BrowseHeader.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
  selectedSchoolId: PropTypes.string,
  selectedSubjectId: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  back: PropTypes.func.isRequired,
};

BrowseHeader.defaultProps = {
  selectedSchoolId: '',
  selectedSubjectId: '',
};

export { BrowseHeader as UnstyledBrowseHeader };
export default withStyles(styles)(BrowseHeader);
