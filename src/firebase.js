import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBOxMXNXgQDtuAoGqP1AVn9JOJOYGs90zc",
  authDomain: "appka-7185b.firebaseapp.com",
  projectId: "appka-7185b",
  storageBucket: "appka-7185b.appspot.com",
  messagingSenderId: "161042452949",
  appId: "1:161042452949:web:2d1c2664f6556099476d5c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
