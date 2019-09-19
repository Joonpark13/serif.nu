import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import useSelector from 'util/use-selector';
import getSearchResultDisplayString from 'util/get-search-result-display-string';
import { searchResultsSelector, searchIsFetchingSelector, currentSearchInputSelector } from 'selectors';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';

const useStyles = makeStyles({
  loadingContainer: {
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  inputHint: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function SearchResults() {
  const classes = useStyles();
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
              <ListItemText primary={getSearchResultDisplayString(course)} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}
