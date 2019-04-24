import { db } from 'util/firebase';
import { CURRENT_TERM } from 'util/constants';

const currentTermDoc = db.collection('terms').doc(CURRENT_TERM);

/* eslint-disable import/prefer-default-export */
export function fetchSections(termId, schoolId, subjectId, courseId) {
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
