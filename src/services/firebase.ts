// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0dfyO41iukjMaxjZZ7EGf7TY9z8nuIPg",
  authDomain: "testnearmaickshopping.firebaseapp.com",
  projectId: "testnearmaickshopping",
  storageBucket: "testnearmaickshopping.appspot.com",
  messagingSenderId: "1020780718778",
  appId: "1:1020780718778:web:330479affc7288cf33b083"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const db = getFirestore()
const storage = getStorage(firebase)

export { firebase, db, storage }