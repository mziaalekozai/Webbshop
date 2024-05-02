import { useState } from "react";
import { updatedProduct } from "../data/crud"; // Säkerställ att denna importering stämmer med din filstruktur
import "../styles/AddItems.css";

const EditItemForm = ({ item, onSave, onCancel, onUpdate }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);
  const [itemType, setItemType] = useState(item.type);

  const handleSave = async () => {
    const updatedData = {
      name,
      price: parseFloat(price),
      type: itemType, // Använd 'type' istället för 'itemType'
      image,
    };
    const success = await updatedProduct("Products", item.id, updatedData);
    if (success) {
      console.log("Update successful!");
      onUpdate();
      onSave();
    } else {
      console.error("Update failed.");
    }
  };

  // const handleSave = async () => {
  //   const updatedData = { name, price: parseFloat(price), itemType, image };
  //   const success = await updatedProduct("Products", item.id, updatedData);
  //   if (success) {
  //     console.log("Update successful!");
  //     onUpdate(); // Kalla på uppdateringsfunktionen
  //     onSave();
  //   } else {
  //     console.error("Update failed.");
  //   }
  // };

  return (
    <div className="container-additem">
      <div className="add-item-input">
        <p>Ändra</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bild URL (valfri)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          // onBlur={() => setItemTypeTouched(true)}
        >
          <option value="">Select Type</option>
          <option value="accessory">Accessory</option>
          <option value="trampoline">Trampoline</option>
        </select>
        {/* {itemTypeTouched && itemTypeError && (
          <div className="error-message">{itemTypeError}</div> */}
        {/* )} */}
        <button className="addNewItem-btn " onClick={handleSave}>
          Save
        </button>
        <button className="addNewItem-btn " onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditItemForm;

// import React, { useState } from "react";
// import { updatedProduct } from "../data/crud"; // Säkerställ att denna importering stämmer med din filstruktur

// const EditItemForm = ({ item, onSave, onCancel, onUpdate }) => {
//   const [name, setName] = useState(item.name);
//   const [price, setPrice] = useState(item.price);
//   const [image, setImage] = useState(item.image);

//   const handleSave = async () => {
//     const updatedData = { name, price: parseFloat(price), image };
//     const success = await updatedProduct("Products", item.id, updatedData);
//     if (success) {
//       console.log("Update successful!");
//       onUpdate(); // Kalla på uppdateringsfunktionen
//       onSave();
//     } else {
//       console.error("Update failed.");
//     }
//   };

//   return (
//     <div className="container-additem">
//       <div className="add-item-input">
//         <p>Ändra</p>
//         <input
//         />
//         <input
//           type="text"
//           placeholder="Bild URL (valfri)"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//         <button className="addNewItem-btn " onClick={handleSave}>
//           Save
//         </button>
//         <button className="addNewItem-btn " onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditItemForm;
