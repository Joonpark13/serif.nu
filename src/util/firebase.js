import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(FIREBASE_CONFIG);

export const db = firebase.firestore();
export const auth = firebase.auth();
