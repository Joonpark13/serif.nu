import React from 'react';
import { useDispatch } from 'react-redux';
import { addSectionFromBrowse, changeBrowseLevel } from 'actions';
import {
  selectedCourseNameSelector,
  browseSectionsSelector,
  sectionsSelector,
} from 'selectors';
import useSelector from 'util/use-selector';
import SectionSelection from '../common/SectionSelection';

export default function SectionSelectionContainer(props) {
  const currentCourseName = useSelector(selectedCourseNameSelector);
  const sections = useSelector(browseSectionsSelector);
  const scheduledSections = useSelector(sectionsSelector);
  const dispatch = useDispatch();

  return (
    <SectionSelection
      {...props}
      currentCourseName={currentCourseName}
      sections={sections}
      scheduledSections={scheduledSections}
      back={() => dispatch(changeBrowseLevel('course'))}
      addSection={section => dispatch(addSectionFromBrowse(section))}
    />
  );
}
