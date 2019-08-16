import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { coursesSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSectionsForBrowseRequest, selectCourseInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

const useStyles = makeStyles({
  loadingContainer: loadingContainerStyles,
});

export default function Courses() {
  const classes = useStyles();
  const courses = useSelector(coursesSelector);
  const isFetching = useSelector(browseIsFetchingSelector);
  const dispatch = useDispatch();

  function showSections(schoolId, subjectId, courseId) {
    dispatch(fetchSectionsForBrowseRequest(schoolId, subjectId, courseId));
    dispatch(selectCourseInBrowse(courseId));
    dispatch(changeBrowseLevel('section'));
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
        {courses && courses.map(course => (
          <ListItem
            key={`${course.id}`}
            button
            onClick={() => showSections(course.schoolId, course.subjectId, course.id)}
          >
            <ListItemText primary={`${course.id} ${course.name}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
