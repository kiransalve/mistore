import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZeZIEP3breqDqfaIz2sU1rLeT5SuywTk",
  authDomain: "mistore-8d37b.firebaseapp.com",
  databaseURL: "https://mistore-8d37b-default-rtdb.firebaseio.com",
  projectId: "mistore-8d37b",
  storageBucket: "mistore-8d37b.appspot.com",
  messagingSenderId: "850228472396",
  appId: "1:850228472396:web:41d6ddb66228b1d293a2e9",
  measurementId: "G-TZV4RMHSTH"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
