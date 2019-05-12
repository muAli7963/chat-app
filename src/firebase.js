import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database'
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
const rtdb = firebase.database();

export function setupPresence(user){

const isOfflineForRTDB = {
  state: 'offline',
  lastChanged: firebase.database.ServerValue.TIMESTAMP
}
const isOnlineForRTDB = {
  state: 'online',
  lastChanged: firebase.database.ServerValue.TIMESTAMP
}

const isOfflineForFirestore = {
  state: 'offline',
  lastChanged: firebase.firestore.FieldValue.serverTimestamp()
}
const isOnlineForFirestore = {
  state: 'online',
  lastChanged: firebase.firestore.FieldValue.serverTimestamp()
}


const rtdbRef = rtdb.ref(`/status/${user.uid}`);
const userDoc = db.doc(`/users/${user.uid}`);


  rtdb.ref('.info/connected').on('value', async snapshot =>{
     if(snapshot.val() === false){
       userDoc.update({
         status: isOfflineForFirestore
       })
       return
     }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB)
    userDoc.update({
      status: isOnlineForFirestore
    })

  })
}

export { db, firebase };
