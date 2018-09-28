import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ searchResults }) => (
  <div>
    {searchResults
      && searchResults.map(course => (
        <div key={`${course.school} ${course.subject} ${course.abbv}`}>{course.name}</div>
      ))
    }
  </div>
);

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
