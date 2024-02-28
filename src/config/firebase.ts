// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0moWgJzicT08I0nmI4m1cgStZ51A5g7A",
  authDomain: "journite-today.firebaseapp.com",
  projectId: "journite-today",
  storageBucket: "journite-today.appspot.com",
  messagingSenderId: "872040529726",
  appId: "1:872040529726:web:f08046eb1f61545e68366f",
  measurementId: "G-S9FZJTTS9Q",
  databaseURL:
    "https://journite-today-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
