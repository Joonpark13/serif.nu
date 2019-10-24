import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { schoolsSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

const useStyles = makeStyles({
  loadingContainer: loadingContainerStyles,
});

export default function Schools() {
  const classes = useStyles();
  const schools = useSelector(schoolsSelector);
  const isFetching = useSelector(browseIsFetchingSelector);
  const dispatch = useDispatch();

  function showSubjects(schoolId) {
    dispatch(fetchSubjectsRequest(schoolId));
    dispatch(selectSchoolInBrowse(schoolId));
    dispatch(changeBrowseLevel('subject'));
  }

  if (isFetching) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <List>
        {schools
          && schools.map(school => (
            <ListItem
              key={`${school.id}`}
              button
              onClick={() => showSubjects(school.id)}
            >
              <ListItemText primary={`${school.name}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}
