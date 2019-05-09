import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadingContainer as loadingContainerStyles } from './common/styles';

export const styles = {
  loadingContainer: loadingContainerStyles,
};

function Subjects({ subjects, isFetching, showCourses, classes }) {
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

Subjects.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  showCourses: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Subjects as UnstyledSubjects };
export default withStyles(styles)(Subjects);
