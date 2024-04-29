import { useState } from "react";
import { UpdateAccessories } from "../data/crud"; // Säkerställ att denna importering stämmer med din filstruktur
import "../styles/AddItems.css";
const EditItemForm = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);

  const handleSave = async () => {
    const success = await UpdateAccessories("Accessories", item.id, {
      name,
      price,
      image,
    });
    if (success) {
      console.log("Update successful!");
      onSave();
    } else {
      console.error("Update failed.");
    }
  };

  return (
    <div className="container-additem">
      <div className="add-item-input">
        <label htmlFor="text">Namn</label>
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
      </div>
      <button className="addItem-btn" onClick={handleSave}>
        Save
      </button>
      <button className="addItem-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditItemForm;
