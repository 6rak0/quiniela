import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'quiniela-79948.firebaseapp.com',
  databaseURL: 'https://quiniela-79948.firebaseio.com',
  projectId: 'quiniela-79948',
  storageBucket: 'quiniela-79948.appspot.com',
  messagingSenderId: '148340249561',
  appId: '1:148340249561:web:c2209cc44575cfe44d7fc8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
