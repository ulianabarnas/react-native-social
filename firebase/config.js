import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSchaoBo9ngIgeO2gewX1nNy71Kbjjzu8",
  authDomain: "rn-social-ce41c.firebaseapp.com",
  projectId: "rn-social-ce41c",
  storageBucket: "rn-social-ce41c.appspot.com",
  messagingSenderId: "967165509911",
  appId: "1:967165509911:web:c62a62607f4d1a7aa4f752",
  measurementId: "G-E27LQMX3SX",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
