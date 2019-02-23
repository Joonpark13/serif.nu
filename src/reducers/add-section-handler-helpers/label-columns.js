import { fromJS } from 'immutable';
import { conflicts, getSectionsByGroup } from './common-helpers';

function conflictsWithColumn(section, column) {
  return column.some(sectionInColumn => conflicts(section, sectionInColumn));
}

export function labelColumnsForSingleGroup(sections) {
  if (sections.size === 1) return sections.setIn([0, 'column'], 0);

  const sorted = [[sections.get(0)]];

  sections.slice(1).forEach((section) => {
    const unconflictingColumn = sorted.find(column => !conflictsWithColumn(section, column));
    if (unconflictingColumn) {
      unconflictingColumn.push(section);
    } else {
      sorted.push([section]);
    }
  });

  let labeled = fromJS([]);
  sorted.forEach((column, columnIndex) => {
    column.forEach((section) => {
      labeled = labeled.push(section.set('column', columnIndex));
    });
  });
  return labeled;
}

export default function labelColumns(sections) {
  const sectionsByGroup = getSectionsByGroup(sections);
  let result = fromJS([]);
  Object.values(sectionsByGroup).forEach((groupedSections) => {
    result = result.concat(labelColumnsForSingleGroup(groupedSections));
  });
  return result;
}
