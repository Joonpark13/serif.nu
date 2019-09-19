import { currentTerm } from 'util/data';

/* eslint-disable import/prefer-default-export */
export function fetchSections(schoolId, subjectId, courseId) {
  const termId = currentTerm.id;
  return import(`data/${termId}/sections.json`)
    .then(
      data => data.default.filter(
        section => section.schoolId === schoolId
          && section.subjectId === subjectId
          && section.courseId === courseId,
      ),
    );
}
