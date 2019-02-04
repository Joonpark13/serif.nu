import db from 'util/firestore';
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
