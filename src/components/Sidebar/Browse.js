import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SchoolsContainer from './SchoolsContainer';

function Browse({ currentBrowseLevel }) {
  return (
    <Fragment>
      {currentBrowseLevel === 'schools' && <SchoolsContainer />}
      {currentBrowseLevel === 'subjects' && <p>subjects</p>}
    </Fragment>
  );
}

Browse.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
};

export default Browse;
