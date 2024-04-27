import "../styles/Accessories.css";
import image5 from "../assets/image/image5.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

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
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
        id: doc.id, // Using Firestore document ID as unique identifier
        ...doc.data(),
      }));
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
          <img className="item-img" src={image5} alt="img" />
          <img
            className="item-img"
            src={accessories.image || image5}
            alt={accessories.name}
          />

          {/* <img src={`/assets/image/${accessories.image}`} alt="Description" /> */}

          <p>{accessories.name}</p>
          <p className="item-price">Pris: {accessories.price} kr</p>
          <div className="add-to-cart">
            <AddToCart
              item={accessories}
              id={accessories.id}
              quantity={findQuantity(accessories.id)}
            />
          </div>
          <div className="admin-edit">
            <FaEdit className="edit-item" />
            <RiDeleteBin5Line className="delet-item" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accessories;
