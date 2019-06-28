import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { coursesSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSectionsForBrowseRequest, selectCourseInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

export const styles = {
  loadingContainer: loadingContainerStyles,
};

function Courses({ classes }) {
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

Courses.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Courses as UnstyledCourses };
export default withStyles(styles)(Courses);
