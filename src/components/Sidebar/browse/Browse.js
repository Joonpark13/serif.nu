import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import BrowseHeaderContainer from './BrowseHeaderContainer';
import SchoolsContainer from './SchoolsContainer';
import SubjectsContainer from './SubjectsContainer';
import CoursesContainer from './CoursesContainer';

function Browse({ currentBrowseLevel }) {
  return (
    <Fragment>
      {currentBrowseLevel !== 'school' && <BrowseHeaderContainer />}
      <Divider />
      {currentBrowseLevel === 'school' && <SchoolsContainer />}
      {currentBrowseLevel === 'subject' && <SubjectsContainer />}
      {currentBrowseLevel === 'course' && <CoursesContainer />}
    </Fragment>
  );
}

Browse.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
};

export default Browse;
