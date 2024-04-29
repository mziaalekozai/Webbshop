import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./fire.js";
import { useState } from "react";

const DeleteTrampoline = async (itemId) => {
  try {
    await deleteDoc(doc(db, "HappyHopperz", itemId));
    console.log("Item successfully deleted from Firestore");
  } catch (error) {
    console.error("Error deleting item from Firestore:", error);
  }
};
const DeleteAccessories = async (itemId) => {
  try {
    await deleteDoc(doc(db, "Accessories", itemId));
    console.log("Item successfully deleted from Firestore");
  } catch (error) {
    console.error("Error deleting item from Firestore:", error);
  }
};
const AddAccessories = async ({ name, price, image }) => {
  try {
    // Lägg till dokument i "Accessories"-samlingen med de insamlade uppgifterna
    await addDoc(collection(db, "Accessories"), {
      name: name,
      price: price,
      image: image,
    });
    console.log("Item successfully added to Firestore");

    // Hämta den uppdaterade listan av tillbehör och returnera den
    const accessoriesCollection = collection(db, "Accessories");
    const accessoriesSnapshot = await getDocs(accessoriesCollection);
    const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return accessoriesList;
  } catch (error) {
    console.error("Error adding item to Firestore:", error);
    throw error; // Kasta felet vidare för att hantera det i den komponent som anropar AddAccessories
  }
};
const UpdateAccessories = async (collectionName, itemId, newData) => {
  const itemRef = doc(db, collectionName, itemId);
  try {
    await updateDoc(itemRef, newData);
    console.log(`Item successfully updated in ${collectionName}`);
    return true;
  } catch (error) {
    console.error(`Error updating item in ${collectionName}:`, error);
    return false;
  }
};
export {
  DeleteAccessories,
  DeleteTrampoline,
  AddAccessories,
  UpdateAccessories,
};

// const collectionName = "trampoline";
// const collectionRef = collections(db, collectionName);

// Example: read all documents in the "fruits" collection
// async function getItems() {
//   const itemCollection = collection(db, collectionName);
//   const itemSnapshot = await getDocs(itemCollection);
//   console.log("getItems: snapshot is", itemSnapshot);
//   const itemList = itemSnapshot.docs.map((doc) => withKey(doc));
//   return itemList;
// }

// Use this if you don't have an id in the objects themselves
// function withKey(doc) {
//   let o = doc.data();
//   o.key = doc.id; // "id" is the document reference
//   return o;
// }

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
