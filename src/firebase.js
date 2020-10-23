import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBilDP3WFdMfdjTJvnDUo2lJq5duHFdzFo",
    authDomain: "keep-my-pass.firebaseapp.com",
    databaseURL: "https://keep-my-pass.firebaseio.com",
    projectId: "keep-my-pass",
    storageBucket: "keep-my-pass.appspot.com",
    messagingSenderId: "957231971062",
    appId: "1:957231971062:web:d0d8716e5b40dc92bd8ad7"
  };

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

export { firestore, firebaseAuth, firebase as default };