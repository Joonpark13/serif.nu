import { conflicts } from './common-helpers';

export default function labelConflictGroups(sections) {
  // Base case
  if (sections.size === 2) {
    if (conflicts(sections.get(0), sections.get(1))) {
      return sections.map(section => section.set('group', 0));
    }
    return sections
      .update(0, section => section.set('group', 0))
      .update(1, section => section.set('group', 1));
  }

  // Recursive case
  const first = sections.get(0);
  let rest = labelConflictGroups(sections.slice(1));

  // If first conflicts with any in rest,
  // first and any group labels that conflict with first should be
  // labeled with the min group label of all that conflict
  const conflictingGroupLabels = [];
  let maxGroupLabel = 0;
  rest.forEach((section) => {
    const sectionGroupLabel = section.get('group');

    if (sectionGroupLabel > maxGroupLabel) {
      maxGroupLabel = sectionGroupLabel;
    }

    if (conflicts(first, section)) {
      conflictingGroupLabels.push(sectionGroupLabel);
    }
  });

  if (conflictingGroupLabels.length !== 0) {
    const minConflictingGroupLabel = Math.min(...conflictingGroupLabels);
    rest = rest.map((section) => {
      if (conflictingGroupLabels.includes(section.get('group'))) {
        return section.set('group', minConflictingGroupLabel);
      }
      return section;
    });

    return rest.insert(0, first.set('group', minConflictingGroupLabel));
  }

  // If first doesn't conflict with any in rest,
  // First should be given the group label of max existing group
  // label + 1
  return rest.insert(0, first.set('group', maxGroupLabel + 1));
}
