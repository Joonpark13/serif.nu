/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Breadcrumbs } from '@material-ui/core';
import useSelector from 'util/use-selector';
import {
  currentBrowseLevelSelector,
  selectedSchoolIdSelector,
  selectedSubjectIdSelector,
} from 'selectors';
import { changeBrowseLevel } from 'actions';

const useStyles = makeStyles({
  browseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breadcrumbs: {
    padding: '5px 10px',
  },
  previousSelections: {
    cursor: 'pointer',
  },
});

export default function BrowseHeader() {
  const classes = useStyles();
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

  const goToLevel = level => dispatch(changeBrowseLevel(level));

  return (
    <div className={classes.browseHeader}>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs aria-label="breadcrumb">
          {selectedSchoolId
            && (
            <Link className={classes.previousSelections} variant="h6" color="inherit" onClick={() => goToLevel('school')}>
              SCHOOLS
            </Link>
            )}
          {selectedSubjectId
            && (
            <Link className={classes.previousSelections} variant="h6" color="inherit" onClick={() => goToLevel('subject')}>
              {selectedSchoolId}
            </Link>
            )}
          <Typography variant="h6">
            {previousSelectionName}
          </Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
}
