import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { subjectsSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchCoursesRequest, selectSubjectInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

const useStyles = makeStyles({
  loadingContainer: loadingContainerStyles,
});

export default function Subjects() {
  const classes = useStyles();
  const subjects = useSelector(subjectsSelector);
  const isFetching = useSelector(browseIsFetchingSelector);
  const dispatch = useDispatch();

  function showCourses(schoolId, subjectId) {
    dispatch(fetchCoursesRequest(schoolId, subjectId));
    dispatch(selectSubjectInBrowse(subjectId));
    dispatch(changeBrowseLevel('course'));
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
        {subjects
          && subjects.map(subject => (
            <ListItem
              key={`${subject.id}`}
              button
              onClick={() => showCourses(subject.schoolId, subject.id)}
            >
              <ListItemText primary={`${subject.id} - ${subject.name}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}
