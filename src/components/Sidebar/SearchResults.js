import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = {
  loadingContainer: {
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
  },
};

function SearchResults({ searchResults, isFetching, classes }) {
  if (isFetching) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <List>
      {searchResults
        && searchResults.map(course => (
          <ListItem
            key={`${course.school} ${course.subject} ${course.abbv}`}
            button
          >
            <ListItemText primary={course.name} />
          </ListItem>
        ))
      }
    </List>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export { SearchResults as UnstyledSearchResults };
export default withStyles(styles)(SearchResults);
