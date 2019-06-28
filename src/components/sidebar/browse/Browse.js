import React, { Fragment } from 'react';
import { Divider } from '@material-ui/core';
import useSelector from 'util/use-selector';
import { currentBrowseLevelSelector } from 'selectors';
import BrowseHeader from './BrowseHeader';
import Schools from './Schools';
import Subjects from './Subjects';
import Courses from './Courses';
import BrowseSectionSelectionContainer from './BrowseSectionSelectionContainer';
import BrowseAssociatedClassSelectionContainer from './BrowseAssociatedClassesSelectionContainer';

function Browse() {
  const currentBrowseLevel = useSelector(currentBrowseLevelSelector);

  const shouldDisplayHeader = (
    currentBrowseLevel !== 'school'
    && currentBrowseLevel !== 'section'
    && currentBrowseLevel !== 'associatedClass'
  );

  return (
    <Fragment>
      {shouldDisplayHeader && <BrowseHeader />}
      {shouldDisplayHeader && <Divider />}
      {currentBrowseLevel === 'school' && <Schools />}
      {currentBrowseLevel === 'subject' && <Subjects />}
      {currentBrowseLevel === 'course' && <Courses />}
      {currentBrowseLevel === 'section' && <BrowseSectionSelectionContainer />}
      {currentBrowseLevel === 'associatedClass' && <BrowseAssociatedClassSelectionContainer />}
    </Fragment>
  );
}

export default Browse;
