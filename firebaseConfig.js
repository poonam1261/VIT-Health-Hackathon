// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0fT0fwGOu0p0NbSutOUZZ187e8FoW3P4",
  authDomain: "vithealthhack.firebaseapp.com",
  projectId: "vithealthhack",
  storageBucket: "vithealthhack.firebasestorage.app",
  messagingSenderId: "2562905969",
  appId: "1:2562905969:web:4b30b5b306ef8636d6c8d0",
  measurementId: "G-5VJTSJPT1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
