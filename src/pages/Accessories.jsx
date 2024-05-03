import { useState, useEffect } from "react";
import { deletProduct } from "../data/crud.js";
// import "../styles/Accessories.css";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import AddItems from "../components/AddItems.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { db } from "../data/fire.js";
import EditItemForm from "../components/EditItemForm.jsx"; // Importera EditItemForm
import SortBy from "../components/SortBy.jsx";
import Search from "../components/Search.jsx";

const Accessories = () => {
  const [accessoriess, setAccessoriess] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);

  const cartItems = UseCartStore((state) => state.cartItems);
  const [showAddItems, setShowAddItems] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccessoriess();
  }, []);
  const fetchAccessoriess = async () => {
    setLoading(true);
    const accessoriesCollection = query(
      collection(db, "Products"),
      where("type", "==", "accessory")
    );
    const accessoriesSnapshot = await getDocs(accessoriesCollection);
    const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAccessoriess(accessoriesList);
    setAllAccessories(accessoriesList); // Spara en kopia av originaldatan
    setLoading(false);
  };

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleDeleteItem = async (itemId) => {
    await deletProduct(itemId);
    setAccessoriess(accessoriess.filter((item) => item.id !== itemId));
  };
  // Andra states och hooks som tidigare definierats...

  const handleEditItemClick = (item) => {
    setEditableItem(item);
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setEditableItem(null);
    setShowAddItems(false); // Korrekt sätt att uppdatera state
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setAccessoriess(allAccessories); // Återställ till original när söktermen är tom
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = allAccessories.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedFilter) ||
          item.type.toLowerCase().includes(lowercasedFilter)
      );
      setAccessoriess(filteredData);
    }
  };
  return (
    <div className="main-container">
      <Search onSearch={handleSearch} />

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
            onProductAdded={fetchAccessoriess}
            item={editableItem}
            onSave={handleCloseForm}
            onCancel={handleCloseForm}
          />
        )}
        {isEditing && (
          <EditItemForm
            item={editableItem}
            onSave={handleCloseForm}
            onCancel={handleCloseForm}
            onUpdate={fetchAccessoriess}
          />
        )}
      </div>
      <SortBy list={accessoriess} setList={setAccessoriess} />

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
