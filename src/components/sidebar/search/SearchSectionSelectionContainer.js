import React from 'react';
import { useDispatch } from 'react-redux';
import useSelector from 'util/use-selector';
import { currentCourseNameSelector, currentSectionsSelector, sectionsSelector } from 'selectors';
import { viewSearch, addSectionFromSearch } from 'actions';
import SectionSelection from '../common/SectionSelection';

function SearchSectionSelectionContainer() {
  const currentCourseName = useSelector(currentCourseNameSelector);
  const sections = useSelector(currentSectionsSelector);
  const scheduledSections = useSelector(sectionsSelector);
  const dispatch = useDispatch();

  return (
    <SectionSelection
      currentCourseName={currentCourseName}
      sections={sections}
      scheduledSections={scheduledSections}
      back={() => dispatch(viewSearch())}
      addSection={section => dispatch(addSectionFromSearch(section))}
    />
  );
}

export default SearchSectionSelectionContainer;
