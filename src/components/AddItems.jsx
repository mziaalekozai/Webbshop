import { useState, useEffect } from "react";
import { addProduct } from "../data/crud.js";

const AddItems = ({ onProductAdded }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [itemNameError, setItemNameError] = useState("");
  const [itemPriceError, setItemPriceError] = useState("");
  const [itemNameTouched, setItemNameTouched] = useState(false);
  const [itemPriceTouched, setItemPriceTouched] = useState(false);

  useEffect(() => {
    validateFields();
  });

  const validateFields = () => {
    let valid = true;
    if (itemName.trim() === "") {
      setItemNameError("Product name is required.");
      valid = false;
    } else {
      setItemNameError("");
    }

    if (itemPrice.trim() === "") {
      setItemPriceError("Price is required.");
      valid = false;
    } else if (isNaN(parseFloat(itemPrice))) {
      setItemPriceError("Price must be a number.");
      valid = false;
    } else {
      setItemPriceError("");
    }

    setIsValid(valid);
  };

  const handleAddItemClick = async () => {
    // Force all fields to be touched to show all errors
    setItemNameTouched(true);
    setItemPriceTouched(true);

    if (!isValid) {
      validateFields(); // Validate fields to ensure error messages are updated

      return;
    }

    const newProduct = {
      name: itemName,
      price: parseFloat(itemPrice),
      image: itemImage || null, // Assume 'null' if no image is specified
    };
    await addProduct(newProduct);
    onProductAdded(); // Call the callback function to update the product list in the parent component
    setItemName("");
    setItemPrice("");
    setItemImage("");
    setItemNameTouched(false);
    setItemPriceTouched(false);
  };

  return (
    <div className="container-additem">
      <div className="add-item-input">
        <input
          type="text"
          placeholder="Product Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onBlur={() => setItemNameTouched(true)}
        />
        {itemNameTouched && itemNameError && (
          <div className="error-message">{itemNameError}</div>
        )}
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          onBlur={() => setItemPriceTouched(true)}
        />
        {itemPriceTouched && itemPriceError && (
          <div className="error-message">{itemPriceError}</div>
        )}
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
        />
        <button
          className="addNewItem-btn"
          onClick={handleAddItemClick}
          disabled={!isValid}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddItems;
