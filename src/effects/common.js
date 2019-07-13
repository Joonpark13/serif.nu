import { db } from 'util/firebase';

/* eslint-disable import/prefer-default-export */
export function fetchSections(currentTerm, schoolId, subjectId, courseId) {
  const currentTermDoc = db.collection('terms').doc(currentTerm);
  return currentTermDoc
    .collection('sections')
    .where('schoolId', '==', schoolId)
    .where('subjectId', '==', subjectId)
    .where('courseId', '==', courseId)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(
      doc => doc.data(),
    ));
}
