// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9Jt-BIJ2rLMBzoC4fT_HDllUqRJ2JFPs",
  authDomain: "hotel-booking-site-d83ec.firebaseapp.com",
  projectId: "hotel-booking-site-d83ec",
  storageBucket: "hotel-booking-site-d83ec.appspot.com",
  messagingSenderId: "882458448020",
  appId: "1:882458448020:web:45bef892c99f7be6b16481",
  measurementId: "G-7VC0P4WK5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
