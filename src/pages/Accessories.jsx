import { useState, useEffect } from "react";
import { UpdateAccessories, DeleteAccessories } from "../data/crud.js";
// import "../styles/Accessories.css";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import AddItems from "../components/AddItems.jsx";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { db } from "../data/fire.js";
import EditItemForm from "../components/EditItemForm.jsx"; // Importera EditItemForm

const Accessories = () => {
  const [accessoriess, setAccessoriess] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems);
  const [showAddItems, setShowAddItems] = useState(false);
  const [editableItem, setEditableItem] = useState(null); // State to handle item being edited

  useEffect(() => {
    const fetchAccessoriess = async () => {
      const accessoriesCollection = collection(db, "Accessories");
      const accessoriesSnapshot = await getDocs(accessoriesCollection);
      if (accessoriesSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
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

  const handleDeleteItem = async (itemId) => {
    await DeleteAccessories(itemId);
    setAccessoriess(accessoriess.filter((item) => item.id !== itemId));
  };
  // Andra states och hooks som tidigare definierats...
  const [isEditing, setIsEditing] = useState(false); // Ny state för att visa/dölja redigeringsformuläret

  const handleEditItemClick = (item) => {
    setEditableItem(item);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditableItem(null);
  };

  // const handleEditItemClick = (item) => {
  //   setEditableItem(item); // Set the item to be edited
  //   setShowAddItems(true); // Open the form
  // };

  return (
    <div className="main-container">
      <div className="add-item">
        <button
          className="addItem-btn"
          onClick={() => {
            setEditableItem(null);
            setShowAddItems(true);
          }}
        >
          Lägg till item
        </button>
        {showAddItems && (
          <AddItems
            item={editableItem}
            onClose={() => setShowAddItems(false)}
          />
        )}
        {isEditing && (
          <EditItemForm
            item={editableItem}
            onSave={handleCloseEdit}
            onCancel={handleCloseEdit}
          />
        )}
      </div>

      <div className="container">
        {accessoriess.map((accessories, index) => (
          <div className="items" key={index}>
            <img
              className="item-img"
              src={accessories.image}
              alt={accessories.name}
            />

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
              <FaEdit
                className="edit-item"
                onClick={() => handleEditItemClick(accessories)}
              />
              <RiDeleteBin5Line
                className="delete-item"
                onClick={() => handleDeleteItem(accessories.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
