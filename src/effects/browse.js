import { currentTerm } from 'util/data';

export function fetchSchools() {
  const termId = currentTerm.id;
  return import(`data/${termId}/schools.json`).then(data => data.default);
}

export function fetchSubjects(schoolId) {
  const termId = currentTerm.id;
  return import(`data/${termId}/subjects.json`)
    .then(data => data.default.filter(subject => subject.schoolId === schoolId));
}

export function fetchCourses(schoolId, subjectId) {
  const termId = currentTerm.id;
  return import(`data/${termId}/courses.json`)
    .then(
      data => data.default.filter(
        course => course.schoolId === schoolId && course.subjectId === subjectId,
      ),
    );
}
