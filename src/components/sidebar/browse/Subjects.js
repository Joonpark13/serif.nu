import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { subjectsSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchCoursesRequest, selectSubjectInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

export const styles = {
  loadingContainer: loadingContainerStyles,
};

function Subjects({ classes }) {
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

Subjects.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Subjects as UnstyledSubjects };
export default withStyles(styles)(Subjects);
