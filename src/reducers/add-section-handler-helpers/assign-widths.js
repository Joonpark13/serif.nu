import { fromJS } from 'immutable';
import { getSectionsByGroup } from './common-helpers';

export function assignWidthsForSingleGroup(sections) {
  let maxColumn = 0;
  sections.forEach((section) => {
    if (section.get('column') > maxColumn) {
      maxColumn = section.get('column');
    }
  });

  return sections.map(section => section.set('columnWidth', 1 / (maxColumn + 1)));
}

export default function assignWidths(sections) {
  const sectionsByGroup = getSectionsByGroup(sections);
  let result = fromJS([]);
  Object.values(sectionsByGroup).forEach((groupedSections) => {
    result = result.concat(assignWidthsForSingleGroup(groupedSections));
  });
  return result;
}
