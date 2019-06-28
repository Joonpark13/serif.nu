import React from 'react';
import { useDispatch } from 'react-redux';
import useSelector from 'util/use-selector';
import {
  addSectionWithAssociatedClassFromBrowse,
  changeBrowseLevel,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import {
  selectedCourseNameSelector,
  selectedSectionNumberSelector,
  selectedSectionAssociatedClassesSelector,
} from 'selectors';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';

function BrowseAssociatedClassesSelectionContainer() {
  const currentCourseName = useSelector(selectedCourseNameSelector);
  const currentSectionNumber = useSelector(selectedSectionNumberSelector);
  const associatedClasses = useSelector(selectedSectionAssociatedClassesSelector);
  const dispatch = useDispatch();

  return (
    <AssociatedClassesSelection
      currentCourseName={currentCourseName}
      currentSectionNumber={currentSectionNumber}
      associatedClasses={associatedClasses}
      back={() => dispatch(changeBrowseLevel('section'))}
      addSectionWithAssociatedClass={
        associatedClass => dispatch(addSectionWithAssociatedClassFromBrowse(associatedClass))
      }
      associatedClassHover={associatedClass => dispatch(associatedClassHover(associatedClass))}
      associatedClassHoverOff={() => dispatch(associatedClassHoverOff())}
    />
  );
}

export default BrowseAssociatedClassesSelectionContainer;
