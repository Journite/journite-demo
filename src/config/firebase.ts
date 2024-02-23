// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHDqrAdDDKiEd9I2TMMmWqhWI8sHnotNE",
  authDomain: "debnote-86594.firebaseapp.com",
  projectId: "debnote-86594",
  storageBucket: "debnote-86594.appspot.com",
  messagingSenderId: "982337438241",
  appId: "1:982337438241:web:05e075c5e213c7873c5960",
  databaseURL: "https://debnote-86594-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);