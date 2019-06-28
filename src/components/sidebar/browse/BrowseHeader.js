import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import useSelector from 'util/use-selector';
import {
  currentBrowseLevelSelector,
  selectedSchoolIdSelector,
  selectedSubjectIdSelector,
} from 'selectors';
import { changeBrowseLevel } from 'actions';

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

function BrowseHeader({ classes }) {
  const currentBrowseLevel = useSelector(currentBrowseLevelSelector);
  const selectedSchoolId = useSelector(selectedSchoolIdSelector);
  const selectedSubjectId = useSelector(selectedSubjectIdSelector);
  const dispatch = useDispatch();

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

    dispatch(changeBrowseLevel(backTo));
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { BrowseHeader as UnstyledBrowseHeader };
export default withStyles(styles)(BrowseHeader);
