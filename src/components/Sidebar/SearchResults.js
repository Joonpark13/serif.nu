import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SearchResults = ({ searchResults }) => (
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

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
