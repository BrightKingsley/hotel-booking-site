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
  apiKey: "AIzaSyCFR74wMNzmtJGXayAgu_yQvA6BL_55C18",
  authDomain: "hotel-haven-790a6.firebaseapp.com",
  projectId: "hotel-haven-790a6",
  storageBucket: "hotel-haven-790a6.appspot.com",
  messagingSenderId: "502264571365",
  appId: "1:502264571365:web:376592bc33920e73cabb0c",
  measurementId: "G-79LSSLHL48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
