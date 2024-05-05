import { useState, useEffect } from "react";
import { addProduct } from "../data/crud.js";

const AddItems = ({ onProductAdded, onCancel }) => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [itemNameError, setItemNameError] = useState("");
  const [itemTypeError, setItemTypeError] = useState("");
  const [itemPriceError, setItemPriceError] = useState("");
  const [itemNameTouched, setItemNameTouched] = useState(false);
  const [itemTypeTouched, setItemTypeTouched] = useState(false);
  const [itemPriceTouched, setItemPriceTouched] = useState(false);

  useEffect(() => {
    validateFields();
  }, [itemName, itemType, itemType, itemPrice]);

  const validateFields = () => {
    let valid = true;
    if (!itemName.trim()) {
      setItemNameError("Produktnamn är obligatoriskt.");
      valid = false;
    } else {
      setItemNameError("");
    }

    if (!itemType.trim()) {
      setItemTypeError("Produkttyp är obligatorisk.");
      valid = false;
    } else {
      setItemTypeError("");
    }

    if (!itemPrice.trim() || isNaN(parseFloat(itemPrice))) {
      setItemPriceError("Priset måste vara ett nummer.");
      valid = false;
    } else {
      setItemPriceError("");
    }

    setIsValid(valid);
  };

  const handleAddItemClick = async () => {
    if (!isValid) {
      validateFields();
      return;
    }

    try {
      const newProduct = {
        name: itemName,
        type: itemType,
        price: parseFloat(itemPrice),
        image: itemImage || null,
      };
      const added = await addProduct(newProduct);
      if (added) {
        onProductAdded();
        onCancel(); // Se till att detta är en funktion
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container-additem">
      <div className="add-item-input">
        <input
          type="text"
          placeholder="Produktnamn och produktinfo"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onBlur={() => setItemNameTouched(true)}
        />
        {itemNameTouched && itemNameError && (
          <div className="error-message">{itemNameError}</div>
        )}

        <input
          type="number"
          placeholder="Pris"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          onBlur={() => setItemPriceTouched(true)}
        />
        {itemPriceTouched && itemPriceError && (
          <div className="error-message">{itemPriceError}</div>
        )}

        <input
          type="text"
          placeholder="Bildadress (valfritt)"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
        />
        <select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          onBlur={() => setItemTypeTouched(true)}
        >
          <option value="">Välj Typ</option>
          <option value="trampoline">Studsmatta</option>
          <option value="accessory">Tillbehör</option>
        </select>
        {itemTypeTouched && itemTypeError && (
          <div className="error-message">{itemTypeError}</div>
        )}
        <button
          className="addNewItem-btn"
          onClick={handleAddItemClick}
          disabled={!isValid}
        >
          Lägg till
        </button>
        <button className="addNewItem-btn" onClick={onCancel}>
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default AddItems;
