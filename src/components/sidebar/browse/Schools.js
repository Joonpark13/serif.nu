import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { schoolsSelector, browseIsFetchingSelector } from 'selectors';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import useSelector from 'util/use-selector';
import { loadingContainer as loadingContainerStyles } from './common/styles';

export const styles = {
  loadingContainer: loadingContainerStyles,
};

function Schools({ classes }) {
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

Schools.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { Schools as UnstyledSchools };
export default withStyles(styles)(Schools);
