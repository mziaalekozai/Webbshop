import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
import { useEffect, useState, useContext } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deletProduct } from "../data/crud.js";
import AddItems from "../components/AddItems.jsx";
import EditItemForm from "../components/EditItemForm.jsx";
import SortBy from "../components/SortBy.jsx";
import Search from "../components/Search.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Trampoline = () => {
  const [trampolines, setTrampolines] = useState([]);
  const [allTrampolines, setAllTrampolines] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems);
  const [showAddItems, setShowAddItems] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth(); // Using useAuth to access the current user

  useEffect(() => {
    fetchTrampolines();
  }, []);

  const fetchTrampolines = async () => {
    setLoading(true);
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
    setAllTrampolines(trampolineList);
    setLoading(false);
  };

  const handleDeleteItem = (itemId) => {
    deletProduct(itemId);
    setTrampolines(trampolines.filter((item) => item.id !== itemId));
  };

  const handleEditItemClick = (item) => {
    setEditableItem(item);
    setShowAddItems(false);
  };
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setTrampolines(allTrampolines);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = allTrampolines.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedFilter) ||
          item.type.toLowerCase().includes(lowercasedFilter)
      );
      console.log(filteredData); // Debug output
      setTrampolines(filteredData);
    }
  };
  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };
  const isAdmin = currentUser && currentUser.isAdmin; // Check if the current user is an admin

  return (
    <div className="main-container">
      <Search onSearch={handleSearch} />
      <div className="add-item">
        {isAdmin && ( // Check if an admin is logged in
          <button className="addItem-btn" onClick={() => setShowAddItems(true)}>
            Lägg till item
          </button>
        )}
        {showAddItems && (
          <AddItems
            onProductAdded={fetchTrampolines}
            item={editableItem}
            onSave={() => setShowAddItems(false)}
            onCancel={() => setShowAddItems(false)}
          />
        )}
        {editableItem && (
          <EditItemForm
            item={editableItem}
            onUpdate={fetchTrampolines}
            onSave={() => {
              setEditableItem(null);
              setShowAddItems(false);
            }}
            onCancel={() => {
              setEditableItem(null);
              setShowAddItems(false);
            }}
          />
        )}
      </div>
      <SortBy list={trampolines} setList={setTrampolines} />
      <div className="container">
        {trampolines.map((trampoline) => (
          <div className="items" key={trampoline.id}>
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
            {isAdmin && (
              <div className="admin-edit">
                <FaEdit
                  className="edit-item"
                  // onClick={() => setEditableItem(trampoline)}
                  onClick={() => handleEditItemClick(trampoline)}
                />
                <RiDeleteBin5Line
                  className="delete-item"
                  onClick={() => handleDeleteItem(trampoline.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trampoline;

// import AddToCart from "../components/AddToCart";
// import UseCartStore from "../data/UseCartStore.js";
// import { useEffect, useState } from "react";
// import { db } from "../data/fire.js";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { FaEdit } from "react-icons/fa";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { deletProduct } from "../data/crud.js";
// import AddItems from "../components/AddItems.jsx";
// import EditItemForm from "../components/EditItemForm.jsx";
// import SortBy from "../components/SortBy.jsx";
// import Search from "../components/Search.jsx";

// const Trampoline = () => {
//   const [trampolines, setTrampolines] = useState([]);
//   const [allTrampolines, setAllTrampolines] = useState([]);
//   const cartItems = UseCartStore((state) => state.cartItems); // Use hook at the top level
//   const [showAddItems, setShowAddItems] = useState(false);
//   const [editableItem, setEditableItem] = useState(null); // State to handle item being edited

//   useEffect(() => {
//     fetchTrampolines();
//   }, []);
//   const [loading, setLoading] = useState(false);

//   const fetchTrampolines = async () => {
//     setLoading(true);
//     try {
//       const trampolineCollection = query(
//         collection(db, "Products"),
//         where("type", "==", "trampoline")
//       );
//       const snapshot = await getDocs(trampolineCollection);
//       const trampolineList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTrampolines(trampolineList);
//       setAllTrampolines(trampolineList);
//     } catch (error) {
//       console.error("Failed to fetch trampolines:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findQuantity = (itemId) => {
//     const item = cartItems.find((item) => item.id === itemId);
//     return item ? item.quantity : 0;
//   };
//   const [isEditing, setIsEditing] = useState(false);
//   const handleDeleteItem = async (itemId) => {
//     await deletProduct(itemId);
//     setTrampolines(trampolines.filter((item) => item.id !== itemId));
//   };

//   const handleEditItemClick = (item) => {
//     setEditableItem(item);
//     setIsEditing(true);
//   };

//   const handleCloseForm = () => {
//     setIsEditing(false);
//     setEditableItem(null);
//     setShowAddItems(false); // Korrekt sätt att uppdatera state
//   };
//   const handleSearch = (searchTerm) => {
//     if (!searchTerm.trim()) {
//       setTrampolines(allTrampolines);
//     } else {
//       const lowercasedFilter = searchTerm.toLowerCase();
//       const filteredData = allTrampolines.filter(
//         (item) =>
//           item.name.toLowerCase().includes(lowercasedFilter) ||
//           item.type.toLowerCase().includes(lowercasedFilter)
//       );
//       console.log(filteredData); // Debug output
//       setTrampolines(filteredData);
//     }
//   };

//   return (
//     <div className="main-container">
//       <Search onSearch={handleSearch} />
//       <div className="add-item">
//         <button
//           className="addItem-btn"
//           onClick={() => {
//             setEditableItem(null);
//             setShowAddItems(true);
//           }}
//         >
//           Lägg till item
//         </button>
//         {showAddItems && (
//           <AddItems
//             onProductAdded={fetchTrampolines}
//             item={editableItem}
//             onSave={handleCloseForm}
//             onCancel={handleCloseForm}
//           />
//         )}
//         {isEditing && (
//           <EditItemForm
//             item={editableItem}
//             onUpdate={fetchTrampolines} // Ny prop för att hämta uppdaterade data
//             onSave={handleCloseForm}
//             onCancel={handleCloseForm}
//           />
//         )}
//       </div>
//       <SortBy list={trampolines} setList={setTrampolines} />

//       <div className="container">
//         {trampolines.map((trampoline) => (
//           <div className="items" key={trampoline.id}>
//             {/* {trampolines.map((trampoline, index) => (
//           <div className="items" key={index}> */}
//             <img
//               className="item-img"
//               src={trampoline.image}
//               alt={trampoline.name}
//             />

//             <p>{trampoline.name}</p>
//             <p className="item-price">Pris: {trampoline.price} kr</p>
//             <div className="add-to-cart">
//               <AddToCart
//                 item={trampoline}
//                 id={trampoline.id}
//                 quantity={findQuantity(trampoline.id)}
//               />
//             </div>
//             <div className="admin-edit">
//               <FaEdit
//                 className="edit-item"
//                 onClick={() => handleEditItemClick(trampoline)}
//               />
//               <RiDeleteBin5Line
//                 className="delet-item"
//                 onClick={() => handleDeleteItem(trampoline.id)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Trampoline;
