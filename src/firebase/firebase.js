import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyA4sv1FaF9LnEiXy38HPVaf-lb7UQuspGQ",
  authDomain: "vueworkoutapp.firebaseapp.com",
  projectId: "vueworkoutapp",
  storageBucket: "vueworkoutapp.appspot.com",
  messagingSenderId: "229095955089",
  appId: "1:229095955089:web:449a6a3e373850dc44fd30",
});

const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();
const storage = firebase.storage();

export { auth, db, database, storage };
