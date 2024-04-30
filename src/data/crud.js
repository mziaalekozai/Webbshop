import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./fire.js";

const deletProduct = async (itemId) => {
  await deleteDoc(doc(db, "Products", itemId));
};
const addProduct = async ({ name, price, image }) => {
  // Lägg till dokument i "Products"-samlingen med de insamlade uppgifterna
  await addDoc(collection(db, "Products"), {
    name: name,
    price: price,
    image: image,
  });

  // Hämta den uppdaterade listan av tillbehör och returnera den
  const accessoriesCollection = collection(db, "Products");
  const accessoriesSnapshot = await getDocs(accessoriesCollection);
  const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return accessoriesList;
};
const updatedProduct = async (collectionName, itemId, newData) => {
  const itemRef = doc(db, collectionName, itemId);
  await updateDoc(itemRef, newData);
  console.log(`Item successfully updated in ${collectionName}`);
  return true;
};
export { deletProduct, addProduct, updatedProduct };
