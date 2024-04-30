import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deletProduct, addProduct, updatedProduct } from "../data/crud.js";
import AddItems from "../components/AddItems.jsx";
import EditItemForm from "../components/EditItemForm.jsx"; // Importera EditItemForm

const Trampoline = () => {
  const [trampolines, setTrampolines] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems); // Use hook at the top level
  const [showAddItems, setShowAddItems] = useState(false);
  const [editableItem, setEditableItem] = useState(null); // State to handle item being edited

  useEffect(() => {
    fetchTrampolines();
  }, []);
  const fetchTrampolines = async () => {
    const trampolineCollection = collection(db, "Products");
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

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleDeleteItem = async (itemId) => {
    await deletProduct(itemId);
    setTrampolines(trampolines.filter((item) => item.id !== itemId));
  };
  // Andra states och hooks som tidigare definierats...
  const [isEditing, setIsEditing] = useState(false); // Ny state för att visa/dölja redigeringsformuläret

  const handleEditItemClick = (item) => {
    setEditableItem(item);
    setIsEditing(true);
  };

  // const handleEditItemClick = async (item) => {
  //   await addProduct(item);
  //   setTrampolines(trampolines.filter((item) => item.id !== item));
  //   setEditableItem(item);
  //   setIsEditing(true);
  // };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditableItem(null);
  };

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
            onProductAdded={fetchTrampolines}
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
        {trampolines.map((trampoline, index) => (
          <div className="items" key={index}>
            <img
              className="item-img"
              src={trampoline.image}
              alt={trampoline.name}
            />

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
              <FaEdit
                className="edit-item"
                onClick={() => handleEditItemClick(trampoline)}
              />
              <RiDeleteBin5Line
                className="delet-item"
                onClick={() => handleDeleteItem(trampoline.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trampoline;
