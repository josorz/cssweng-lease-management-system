// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHknURgQCleJPEhIQzihalNTgdOtl6lMA",
  authDomain: "property-management-syst-2dead.firebaseapp.com",
  projectId: "property-management-syst-2dead",
  storageBucket: "property-management-syst-2dead.appspot.com",
  messagingSenderId: "484430775258",
  appId: "1:484430775258:web:2036536669fc52b03ff6e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };