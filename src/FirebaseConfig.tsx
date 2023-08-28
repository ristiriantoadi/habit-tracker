// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5nysv5GeFqjMvpDHAyCv7zHRyO1Mubwk",
  authDomain: "habit-tracker-d6a77.firebaseapp.com",
  projectId: "habit-tracker-d6a77",
  storageBucket: "habit-tracker-d6a77.appspot.com",
  messagingSenderId: "696586132868",
  appId: "1:696586132868:web:20aca16562d26430d7d1d1",
  measurementId: "G-LYY8R3QWQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  