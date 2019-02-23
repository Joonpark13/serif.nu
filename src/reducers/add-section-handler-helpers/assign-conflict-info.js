import labelConflictGroups from './label-conflict-groups';
import labelColumns from './label-columns';
import assignWidths from './assign-widths';

export default function assignConflictInfo(sections) {
  const groupedSections = labelConflictGroups(sections);
  const sectionsWithColumnlabels = labelColumns(groupedSections);
  return assignWidths(sectionsWithColumnlabels);
}
