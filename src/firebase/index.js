import firebase from 'firebase/app';
import 'firebase/firebase-storage';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEYL,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

  firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();

export default storage;