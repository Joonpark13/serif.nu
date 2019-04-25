import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import BrowseHeaderContainer from './BrowseHeaderContainer';
import SchoolsContainer from './SchoolsContainer';
import SubjectsContainer from './SubjectsContainer';
import CoursesContainer from './CoursesContainer';
import BrowseSectionSelectionContainer from './BrowseSectionSelectionContainer';
import BrowseAssociatedClassSelectionContainer from './BrowseAssociatedClassesSelectionContainer';

function Browse({ currentBrowseLevel }) {
  const shouldDisplayHeader = (
    currentBrowseLevel !== 'school'
    && currentBrowseLevel !== 'section'
    && currentBrowseLevel !== 'associatedClass'
  );
  return (
    <Fragment>
      {shouldDisplayHeader && <BrowseHeaderContainer />}
      {shouldDisplayHeader && <Divider />}
      {currentBrowseLevel === 'school' && <SchoolsContainer />}
      {currentBrowseLevel === 'subject' && <SubjectsContainer />}
      {currentBrowseLevel === 'course' && <CoursesContainer />}
      {currentBrowseLevel === 'section' && <BrowseSectionSelectionContainer />}
      {currentBrowseLevel === 'associatedClass' && <BrowseAssociatedClassSelectionContainer />}
    </Fragment>
  );
}

Browse.propTypes = {
  currentBrowseLevel: PropTypes.string.isRequired,
};

export default Browse;
