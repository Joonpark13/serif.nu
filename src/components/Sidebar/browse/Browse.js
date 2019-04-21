import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import BrowseHeaderContainer from './BrowseHeaderContainer';
import SchoolsContainer from './SchoolsContainer';
import SubjectsContainer from './SubjectsContainer';

function Browse({ currentBrowseLevel }) {
  return (
    <Fragment>
      {currentBrowseLevel !== 'school' && <BrowseHeaderContainer />}
      <Divider />
      {currentBrowseLevel === 'school' && <SchoolsContainer />}
      {currentBrowseLevel === 'subject' && <SubjectsContainer />}
    </Fragment>
  );
}

Browse.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
};

export default Browse;
