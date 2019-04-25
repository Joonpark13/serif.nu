import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadingContainer as loadingContainerStyles } from './common/styles';

export const styles = {
  loadingContainer: loadingContainerStyles,
};

function Courses({ courses, isFetching, classes, showSections }) {
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
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  showSections: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Courses as UnstyledCourses };
export default withStyles(styles)(Courses);
