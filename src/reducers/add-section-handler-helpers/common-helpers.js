import { fromJS } from 'immutable';
import { overlaps } from 'util/time';

export function conflicts(section1, section2) {
  return overlaps(section1.get('event').toJS(), section2.get('event').toJS());
}

export function getSectionsByGroup(sections) {
  const sectionsByGroup = {};
  sections.forEach((section) => {
    const groupLabel = section.get('group');
    if (!Object.keys(sectionsByGroup).includes(groupLabel.toString())) {
      sectionsByGroup[groupLabel] = fromJS([section]);
    } else {
      sectionsByGroup[groupLabel] = sectionsByGroup[groupLabel].push(section);
    }
  });
  return sectionsByGroup;
}
