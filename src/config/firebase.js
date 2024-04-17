// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";  `Not needed for now`.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpQzUdsbmidFiGaD0rCRK6NwJgWlEv9gQ",
  authDomain: "starting-firebase-c85f4.firebaseapp.com",
  projectId: "starting-firebase-c85f4",
  storageBucket: "starting-firebase-c85f4.appspot.com",
  messagingSenderId: "707872906009",
  appId: "1:707872906009:web:a8edc86629ff8c16674388",
  measurementId: "G-03DGM1PCXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider =new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);        `Not needed for now`.