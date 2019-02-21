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

export function fetchSubjects(termId, subjectId) {
  return currentTermDoc
    .collection('subjects')
    .where('id', '==', subjectId)
    .get()
    .then(
      querySnapshot => querySnapshot.docs.map(doc => doc.data()),
    );
}
