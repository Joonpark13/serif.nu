import React from 'react';
import PropTypes from 'prop-types';
import SearchBoxContainer from './SearchBoxContainer';
import SearchResultsContainer from './SearchResultsContainer';
import SectionSelectionContainer from './SectionSelectionContainer';

const Search = ({ view }) => (
  <div>
    {view === 'search' && (
      <React.Fragment>
        <SearchBoxContainer />
        <SearchResultsContainer />
      </React.Fragment>
    )}
    {view === 'sectionSelection' && <SectionSelectionContainer />}
  </div>
);

Search.propTypes = {
  view: PropTypes.string.isRequired,
};

export default Search;
