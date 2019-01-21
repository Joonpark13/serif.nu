import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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
  searchResults: {
    height: 'calc(100vh - 190px)', // 64px is height of TopBar, 48px is height of SearchBox, 48px is height of tab, 30px margin
    overflow: 'auto',
  },
};

function SearchResults({
  searchResults,
  isFetching,
  currentSearchInput,
  handleCourseClick,
  classes,
}) {
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
    <div className={classes.searchResults}>
      {currentSearchInput.length > 0 && currentSearchInput.length <= 2
        && <Typography className={classes.inputHint}> Keep typing!</Typography>
      }
      <List>
        {searchResults
          && searchResults.map(course => (
            <ListItem
              key={`${course.school} ${course.subject} ${course.abbv}`}
              button
              onClick={() => handleCourseClick(course.school, course.subject, course.abbv)}
            >
              <ListItemText primary={`${course.subject} ${course.abbv} ${course.name}`} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleCourseClick: PropTypes.func.isRequired,
  currentSearchInput: PropTypes.string.isRequired,
};

export { SearchResults as UnstyledSearchResults };
export default withStyles(styles)(SearchResults);
