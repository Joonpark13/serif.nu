import { db } from 'util/firebase';

const getTermDocument = documentName => db.collection('terms').doc(documentName);

export function fetchSchools(currentTerm) {
  const currentTermDoc = getTermDocument(currentTerm);
  return currentTermDoc
    .collection('schools')
    .get()
    .then(
      querySnapshot => querySnapshot.docs.map(doc => doc.data()),
    );
}

export function fetchSubjects(currentTerm, schoolId) {
  const currentTermDoc = getTermDocument(currentTerm);
  return currentTermDoc
    .collection('subjects')
    .where('schoolId', '==', schoolId)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}

export function fetchCourses(currentTerm, schoolId, subjectId) {
  const currentTermDoc = getTermDocument(currentTerm);
  return currentTermDoc
    .collection('courses')
    .where('schoolId', '==', schoolId)
    .where('subjectId', '==', subjectId)
    .get()
    .then(
      querySnapshot => querySnapshot.docs.map(doc => doc.data()),
    );
}
