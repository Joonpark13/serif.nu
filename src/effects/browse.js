import { db } from 'util/firebase';
import { CURRENT_TERM } from 'util/constants';

const currentTermDoc = db.collection('terms').doc(CURRENT_TERM);

/* eslint-disable import/prefer-default-export */
export function fetchSchools() {
  return currentTermDoc
    .collection('schools')
    .get()
    .then(
      querySnapshot => querySnapshot.docs.map(doc => doc.data()),
    );
}

export function fetchCourses(termId, schoolId, subjectId) {
  return currentTermDoc
    .collection('courses')
    .where('termId', '==', termId)
    .where('schoolId', '==', schoolId)
    .where('subjectId', '==', subjectId)
    .get()
    .then(
      querySnapshot => querySnapshot.docs.map(doc => doc.data()),
    );
}
