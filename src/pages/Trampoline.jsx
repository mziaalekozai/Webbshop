import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const [loading, setLoading] = useState(false);

  const fetchTrampolines = async () => {
    setLoading(true);
    try {
      const trampolineCollection = query(
        collection(db, "Products"),
        where("type", "==", "trampoline")
      );
      const snapshot = await getDocs(trampolineCollection);
      const trampolineList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrampolines(trampolineList);
    } catch (error) {
      console.error("Failed to fetch trampolines:", error);
    } finally {
      setLoading(false);
    }
  };

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleDeleteItem = async (itemId) => {
    await deletProduct(itemId);
    setTrampolines(trampolines.filter((item) => item.id !== itemId));
  };

  const handleEditItemClick = (item) => {
    setEditableItem(item);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditableItem(null);
    setShowAddItems(true); // Korrekt sätt att uppdatera state
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
            onUpdate={fetchTrampolines} // Ny prop för att hämta uppdaterade data
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
