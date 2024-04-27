import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Changed from 'firebase/firestore/lite'

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

export { db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const fire = {
//   apiKey: "AIzaSyBrkrZYGGDWHo4MxvjrvTBKwOzPTzlGPp0",
//   authDomain: "happy-hopperz.firebaseapp.com",
//   projectId: "happy-hopperz",
//   storageBucket: "happy-hopperz.appspot.com",
//   messagingSenderId: "623912342637",
//   appId: "1:623912342637:web:4e21c5dbe9b4bd9c5edb64",
// };

// // Initialize Firebase
// const app = initializeApp(fire);
// const db = getFirestore(app);
// export { db };
