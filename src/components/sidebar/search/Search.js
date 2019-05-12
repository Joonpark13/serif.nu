import React from 'react';
import PropTypes from 'prop-types';
import SearchBoxContainer from './SearchBoxContainer';
import SearchResultsContainer from './SearchResultsContainer';
import SearchSectionSelectionContainer from './SearchSectionSelectionContainer';
import SearchAssociatedClassesSelectionContainer from './SearchAssociatedClassesSelectionContainer';

const Search = ({ view }) => (
  <div>
    {view === 'search' && (
      <React.Fragment>
        <SearchBoxContainer />
        <SearchResultsContainer />
      </React.Fragment>
    )}
    {view === 'sectionSelection' && <SearchSectionSelectionContainer />}
    {view === 'associatedClassesSelection' && <SearchAssociatedClassesSelectionContainer />}
  </div>
);

Search.propTypes = {
  view: PropTypes.string.isRequired,
};

export default Search;
