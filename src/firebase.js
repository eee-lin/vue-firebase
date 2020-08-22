import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYjfuW8TdRKz_BARtbPsQ8_HkcuK9s0Yo",
  authDomain: "vue-firebase-28ee6.firebaseapp.com",
  databaseURL: "https://vue-firebase-28ee6.firebaseio.com",
  projectId: "vue-firebase-28ee6",
  storageBucket: "vue-firebase-28ee6.appspot.com",
  messagingSenderId: "620247222414",
  appId: "1:620247222414:web:672e760b40a1159add61df",
  measurementId: "G-X47NTN07G1",
};

const app = firebase.initializeApp(firebaseConfig);

//export const db = firebase.firestore;

export default app.firestore();
