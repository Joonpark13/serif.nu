import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

function BrowseHeader({ currentBrowseLevel, selectedSchoolId, classes, back }) {
  let previousSelectionName;
  if (currentBrowseLevel === 'subject') {
    previousSelectionName = selectedSchoolId;
  }

  return (
    <div className={classes.browseHeader}>
      <div className={classes.selectionName}>
        <Typography variant="h5">
          {previousSelectionName}
        </Typography>
      </div>

      <div className={classes.backButton}>
        <Button onClick={back}>Back</Button>
      </div>
    </div>
  );
}

BrowseHeader.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
  selectedSchoolId: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  back: PropTypes.func.isRequired,
};

BrowseHeader.defaultProps = {
  selectedSchoolId: '',
};

export { BrowseHeader as UnstyledBrowseHeader };
export default withStyles(styles)(BrowseHeader);
