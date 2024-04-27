import "../styles/Accessories.css";
// import image5 from "../assets/image/image5.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs } from "firebase/firestore";

const Accessories = () => {
  const [accessoriess, setAccessoriess] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems);
  useEffect(() => {
    const fetchAccessoriess = async () => {
      const accessoriesCollection = collection(db, "Accessories");
      const accessoriesSnapshot = await getDocs(accessoriesCollection);
      if (accessoriesSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => doc.data());
      setAccessoriess(accessoriesList);
    };

    fetchAccessoriess();
  }, []);

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container">
      {accessoriess.map((accessories, index) => (
        <div className="items" key={index}>
          <img src={`/assets/image/${accessories.image}`} alt="Description" />

          <p>{accessories.name}</p>
          <p className="item-price">Pris: {accessories.price} kr</p>
          <div className="add-to-cart">
            <AddToCart quantity={findQuantity(accessories.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

//   useEffect(() => {
//     const fetchAccessoriess = async () => {
//       // Update the collection name to "HappyHopperz"
//       const accessoriesCollection = collection(db, "HappyHopperz");
//       const accessoriesSnapshot = await getDocs(accessoriesCollection);
//       if (accessoriesSnapshot.empty) {
//         console.log("No matching documents.");
//         return;
//       }
//       const accessoriesList = accessoriesSnapshot.docs.map((doc) => doc.data());
//       console.log("accessoriess fetched:", accessoriesList);
//       setAccessoriess(accessoriesList);
//     };

//     fetchAccessoriess();
//   }, []);

//   const findQuantity = (itemId) => {
//     const cartItems = UseCartStore((state) => state.cartItems);
//     const item = cartItems.find((item) => item.id === itemId);
//     return item ? item.quantity : 0;
//   };
//   return (
//     <div className="container">
//       <div className="items">
//         <img className="item-img" src={image5} alt="image1" />
//         <p className="item-info">Universalstege till studsmatta 60-100 cm</p>
//         <p className="item-price">Pris: 299 kr</p>
//         <div className="add-to-cart">
//           <AddToCart quantity={findQuantity()} />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Accessories;
