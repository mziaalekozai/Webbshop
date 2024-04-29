import { useState, useEffect } from "react";
import { AddAccessories } from "../data/crud.js";
import "../styles/AddItems.css";

const AddItems = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemNameTouched, setItemNameTouched] = useState(false);
  const [itemPriceTouched, setItemPriceTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [priceError, setPriceError] = useState(""); // Additional state for price-specific error

  useEffect(() => {
    const validateInput = () => {
      let valid = true;
      if (itemName.trim() === "" && itemNameTouched) {
        setErrorMessage("Please enter a name.");
        valid = false;
      } else {
        setErrorMessage("");
      }

      if (itemPriceTouched) {
        if (itemPrice.trim() === "") {
          setPriceError("Please enter a price.");
          valid = false;
        } else if (isNaN(parseFloat(itemPrice))) {
          setPriceError("Please enter only numbers for the price.");
          valid = false;
        } else {
          setPriceError("");
        }
      }

      setIsValid(valid);
    };

    validateInput();
  }, [itemName, itemPrice, itemNameTouched, itemPriceTouched]);

  const handleAddItemClick = async () => {
    if (!isValid) {
      return;
    }
    await AddAccessories({
      name: itemName,
      price: itemPrice,
      image: itemImage,
    });
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
          placeholder="Namn och info"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          onBlur={() => setItemNameTouched(true)}
        />
        {errorMessage && <p className="error-massege"> {errorMessage}</p>}
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          onBlur={() => setItemPriceTouched(true)}
        />
        {priceError && <p>{priceError}</p>}
        <input
          type="text"
          placeholder="Bild URL (valfri)"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
        />
      </div>
      <button
        className="addItem-btn"
        onClick={handleAddItemClick}
        disabled={!isValid}
      >
        Lägg till
      </button>
    </div>
  );
};

export default AddItems;

// import { useState } from "react";
// import { AddAccessories } from "../data/crud.js";

// const AddItems = () => {
//   const [itemName, setItemName] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [itemImage, setItemImage] = useState("");

//   const handleAddItemClick = async () => {
//     await AddAccessories({
//       name: itemName,
//       price: itemPrice,
//       image: itemImage,
//     });
//     // Återställ input-fälten efter att objektet har lagts till
//     setItemName("");
//     setItemPrice("");
//     setItemImage("");
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="add-item">
//           <input
//             type="text"
//             placeholder="Namn"
//             value={itemName}
//             onChange={(e) => setItemName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Pris"
//             value={itemPrice}
//             onChange={(e) => setItemPrice(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Bild URL (valfri)"
//             value={itemImage}
//             onChange={(e) => setItemImage(e.target.value)}
//           />
//           <button onClick={handleAddItemClick}>Lägg till</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddItems;
