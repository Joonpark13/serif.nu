import assignConflictInfo from './assign-conflict-info';
import assignColor from './assign-color';

export default function prepClassesForCalendar(
  sections, color, associatedClasses,
) {
  if (associatedClasses) {
    const sectionsAndAssociatedClasses = sections.concat(associatedClasses);
    const sectionsAndAssociatedClassesWithConflictInfo = assignConflictInfo(
      sectionsAndAssociatedClasses,
    );

    const sectionsWithConflictInfo = sectionsAndAssociatedClassesWithConflictInfo.filter(
      sectionOrAssociatedClass => sectionOrAssociatedClass.get('id'),
    );
    // Associated classes do not have an id field
    const associatedClassesWithConflictInfo = sectionsAndAssociatedClassesWithConflictInfo.filter(
      sectionOrAssociatedClass => !sectionOrAssociatedClass.get('id'),
    );

    // In the case of removing classes, assignColor will do nothing
    const sectionsWithConflictInfoAndColor = assignColor(color, sectionsWithConflictInfo);
    const associatedClassWithConfictInfoAndColor = assignColor(
      color,
      associatedClassesWithConflictInfo,
    );

    return {
      sections: sectionsWithConflictInfoAndColor,
      associatedClasses: associatedClassWithConfictInfoAndColor,
    };
  }

  const sectionsWithConflictInfo = assignConflictInfo(sections);

  // In the case of removing classes, assignColor will do nothing
  const sectionsWithConflictInfoAndColor = assignColor(color, sectionsWithConflictInfo);

  return { sections: sectionsWithConflictInfoAndColor };
}
