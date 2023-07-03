// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import jsonArray from "../data/hotels.json";
import process from "process";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId,
// };

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

const types = ["single", "double", "triple"];

export const importJSONToFirestore = async () => {
  jsonArray.forEach(async (data: any) => {
    const uniqueId = uuid();
    const selectedType = Math.round(Math.random() * 2);
    await setDoc(doc(db, "hotels", uniqueId), {
      ...data,
      id: uniqueId,
      type: types[selectedType],
    });
  });

  console.log("Data imported successfully!");
};

// console.log("THREE", types[0]);

// const items = [
//   { try: "1", type: null },
//   { try: "2", type: null },
//   { try: "3", type: null },
//   { try: "4", type: null },
//   { try: "5", type: null },
//   { try: "6", type: null },
// ];

// const modify = () => {
//   let updatedList = [];
//   items.forEach((item) => {
//     const selectedType = Math.round(Math.random() * 3);
//     console.log("SELECTED", selectedType, types[selectedType]);
//     const updated = { ...item, type: types[selectedType] };
//     updatedList.push(updated);
//   });
//   console.log("MODIFY_TEST", updatedList);
// };

// modify();
