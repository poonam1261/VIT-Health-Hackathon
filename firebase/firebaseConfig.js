// Import the functions you need from the SDKs you need
import  { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

 const firebaseConfig = {
  apiKey: "AIzaSyB0fT0fwGOu0p0NbSutOUZZ187e8FoW3P4",
  authDomain: "vithealthhack.firebaseapp.com",
  projectId: "vithealthhack",
  storageBucket: "vithealthhack.firebasestorage.app",
  messagingSenderId: "2562905969",
  appId: "1:2562905969:web:4b30b5b306ef8636d6c8d0",
  measurementId: "G-5VJTSJPT1H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

