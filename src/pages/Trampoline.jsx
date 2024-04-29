import "../styles/Trampoline.css";
// import image1 from "../assets/image/image1.jpg";
// import image3 from "../assets/image/image3.jpg";
// import image4 from "../assets/image/image4.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DeleteTrampoline } from "../data/crud.js";

const Trampoline = () => {
  const [trampolines, setTrampolines] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems); // Use hook at the top level

  useEffect(() => {
    const fetchTrampolines = async () => {
      const trampolineCollection = collection(db, "HappyHopperz");
      const trampolineSnapshot = await getDocs(trampolineCollection);
      if (trampolineSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const trampolineList = trampolineSnapshot.docs.map((doc) => ({
        id: doc.id, // Using Firestore document ID as unique identifier
        ...doc.data(),
      }));
      setTrampolines(trampolineList);
    };

    fetchTrampolines();
  }, []);

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };
  const handleDeleteItem = async (itemId) => {
    await DeleteTrampoline(itemId);
    setTrampolines(trampolines.filter((item) => item.id !== itemId));
  };
  return (
    <div className="container">
      {trampolines.map((trampoline, index) => (
        <div className="items" key={index}>
          <img src={`/assets/image/${trampoline.image}`} alt="Description" />

          <p>{trampoline.name}</p>
          <p className="item-price">Pris: {trampoline.price} kr</p>
          <div className="add-to-cart">
            <AddToCart
              item={trampoline}
              id={trampoline.id}
              quantity={findQuantity(trampoline.id)}
            />
          </div>
          <div className="admin-edit">
            <FaEdit className="edit-item" />
            <RiDeleteBin5Line
              className="delet-item"
              onClick={() => handleDeleteItem(trampoline.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trampoline;
