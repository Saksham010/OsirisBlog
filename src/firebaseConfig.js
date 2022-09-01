// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrSPnZHaiNAUSphSKyWuzetloemHdRrCM",
  authDomain: "osiris-blog.firebaseapp.com",
  projectId: "osiris-blog",
  storageBucket: "osiris-blog.appspot.com",
  messagingSenderId: "454399679706",
  appId: "1:454399679706:web:671fc3ac9505799f00d9e3",
  measurementId: "G-Z2VTVYG2KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// const analytics = getAnalytics(app);
