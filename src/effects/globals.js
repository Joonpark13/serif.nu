/* eslint-disable import/prefer-default-export */
import { db } from 'util/firebase';

export function fetchCurrentTerm() {
  return db.collection('terms')
    .orderBy('id')
    .limit(1)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
}
