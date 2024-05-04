import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const fire = {
  apiKey: "AIzaSyBrkrZYGGDWHo4MxvjrvTBKwOzPTzlGPp0",
  authDomain: "happy-hopperz.firebaseapp.com",
  projectId: "happy-hopperz",
  storageBucket: "happy-hopperz.appspot.com",
  messagingSenderId: "623912342637",
  appId: "1:623912342637:web:4e21c5dbe9b4bd9c5edb64",
};

// Initialize Firebase
const app = initializeApp(fire);
const db = getFirestore(app);
const auth = getAuth(app); // This initializes Firebase Authentication

export { db, auth }; // Export both Firestore and Auth for use in your app
