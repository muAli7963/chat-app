import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const config = {
  apiKey: "AIzaSyA_y68mYSpKGvHg2rpOCzuSn7--LknQGNo",
  authDomain: "chat-app-cb7ad.firebaseapp.com",
  databaseURL: "https://chat-app-cb7ad.firebaseio.com",
  projectId: "chat-app-cb7ad",
  storageBucket: "chat-app-cb7ad.appspot.com",
  messagingSenderId: "231951309364"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase };
