import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "./fire.js";

const collectionName = "trampoline";
const collectionRef = collections(db, collectionName);

// Example: read all documents in the "fruits" collection
async function getItems() {
  const itemCollection = collection(db, collectionName);
  const itemSnapshot = await getDocs(itemCollection);
  console.log("getItems: snapshot is", itemSnapshot);
  const itemList = itemSnapshot.docs.map((doc) => withKey(doc));
  return itemList;
}

// Use this if you don't have an id in the objects themselves
function withKey(doc) {
  let o = doc.data();
  o.key = doc.id; // "id" is the document reference
  return o;
}

export { getItems };

// import { db } from "./firestoreConfig";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore/lite";

// const collectionName = "trampoline";
// const collectionRef = collection(db, collectionName);

// async function getTrampoline() {
//   // Skapa en referens till collection "employees" i databasen
//   const employeeCollection = collection(db, collectionName);

//   // Hämta alla dokument i collection "employees"
//   const employeeSnapshot = await getDocs(employeeCollection);
//   // console.log('getEmployees: snapshot is', employeeSnapshot)

//   const employeeList = employeeSnapshot.docs.map((doc) => withKey(doc));
//   return employeeList;
// }

// // Use this if you don't have an id in the objects themselves
// function withKey(doc) {
//   let o = doc.data();
//   o.key = doc.id; // "id" is the document reference
//   return o;
// }
// // const getProducts = async () => {
// //     getTrampoline = async () => {
// //     const {docs} = await getDocs(collectionRef);
// //     return docs.map(doc => {
// //         return{...doc.data(),id: doc.id}
// //     }
// //     }
// // };

// export default getTrampoline;
