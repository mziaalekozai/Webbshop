import { useState } from "react";
import { UpdateAccessories } from "../data/crud.js";

const handleEditItem = async (itemId, newData) => {
  // Anropa UpdateAccessories-funktionen och skicka med id för det objekt som ska uppdateras
  // samt den nya datan som ska uppdateras
  const success = await UpdateAccessories(itemId, newData);

  // Om uppdateringen lyckades, visa ett meddelande eller utför andra åtgärder
  if (success) {
    console.log("Item successfully updated!");
  } else {
    console.log("Failed to update item!");
  }
};

const EditItemForm = ({ accessories }) => {
  const [newName, setNewName] = useState(accessories.name);
  const [newPrice, setNewPrice] = useState(accessories.price);

  const handleSave = () => {
    // Skapa en newData-objekt med de nya uppgifterna
    const newData = {
      name: newName,
      price: newPrice,
      // Om du behöver hantera fler uppgifter kan du lägga till dem här
    };

    // Anropa handleEditItem med det valda objektets id och de nya uppgifterna
    handleEditItem(accessories.id, newData);
  };

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="text"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button onClick={handleSave}>Spara</button>
    </div>
  );
};

export default EditItemForm;
