import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDluAG6bnqleqJ3yjPvGdlb3RyZP3U5JIQ',
  authDomain: 'sans-serif-northwestern.firebaseapp.com',
  databaseURL: 'https://sans-serif-northwestern.firebaseio.com',
  projectId: 'sans-serif-northwestern',
  storageBucket: 'sans-serif-northwestern.appspot.com',
  messagingSenderId: '1078100635889',
});

export default firebase.firestore();
