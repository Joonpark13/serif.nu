import React from 'react';
import { useDispatch } from 'react-redux';
import useSelector from 'util/use-selector';
import {
  viewSectionSelection,
  addSectionWithAssociatedClassFromSearch,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import {
  currentCourseNameSelector,
  currentSectionNumberSelector,
  currentAssociatedClassesSelector,
} from 'selectors';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';

export default function SearchAssociatedClassesSelectionContainer() {
  const currentCourseName = useSelector(currentCourseNameSelector);
  const currentSectionNumber = useSelector(currentSectionNumberSelector);
  const associatedClasses = useSelector(currentAssociatedClassesSelector);
  const dispatch = useDispatch();

  return (
    <AssociatedClassesSelection
      currentCourseName={currentCourseName}
      currentSectionNumber={currentSectionNumber}
      associatedClasses={associatedClasses}
      back={() => dispatch(viewSectionSelection())}
      addSectionWithAssociatedClass={
        associatedClass => dispatch(addSectionWithAssociatedClassFromSearch(associatedClass))
      }
      associatedClassHover={associatedClass => dispatch(associatedClassHover(associatedClass))}
      associatedClassHoverOff={() => dispatch(associatedClassHoverOff())}
    />
  );
}
