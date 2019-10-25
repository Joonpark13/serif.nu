import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import useSelector from 'util/use-selector';
import { searchResultsSelector, searchIsFetchingSelector, currentSearchInputSelector } from 'selectors';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';

export const styles = {
  loadingContainer: {
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  inputHint: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function SearchResults({ classes }) {
  const searchResults = useSelector(searchResultsSelector);
  const isFetching = useSelector(searchIsFetchingSelector);
  const currentSearchInput = useSelector(currentSearchInputSelector);
  const dispatch = useDispatch();

  function handleCourseClick(schoolId, subjectId, courseId) {
    dispatch(fetchSectionsForSearchRequest(schoolId, subjectId, courseId));
    dispatch(setCurrentCourseName(`${subjectId} ${courseId}`));
  }

  if (isFetching) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }
  if (searchResults.length === 0 && currentSearchInput.length >= 3) {
    return (
      <Typography className={classes.inputHint}>
        No results
      </Typography>
    );
  }
  return (
    <div>
      {currentSearchInput.length > 0 && currentSearchInput.length <= 2
        && <Typography className={classes.inputHint}> Keep typing!</Typography>
      }
      <List>
        {searchResults
          && searchResults.map(course => (
            <ListItem
              key={`${course.schoolId} ${course.subjectId} ${course.id}`}
              button
              onClick={() => handleCourseClick(course.schoolId, course.subjectId, course.id)}
            >
              <ListItemText primary={`${course.subjectId} ${course.id} ${course.name}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

SearchResults.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export { SearchResults as UnstyledSearchResults };
export default withStyles(styles)(SearchResults);
