export default function assignColor(color, sections) {
  return sections.map(
    sectionWithConflictInfo => sectionWithConflictInfo.get('color')
      ? sectionWithConflictInfo
      : sectionWithConflictInfo.set('color', color),
  );
}
