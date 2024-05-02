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
      setItemNameError("Product name is required.");
      valid = false;
    } else {
      setItemNameError("");
    }

    if (!itemType.trim()) {
      setItemTypeError("Product type is required.");
      valid = false;
    } else {
      setItemTypeError("");
    }

    if (!itemPrice.trim() || isNaN(parseFloat(itemPrice))) {
      setItemPriceError("Price must be a number.");
      valid = false;
    } else {
      setItemPriceError("");
    }

    setIsValid(valid);
  };

  const handleAddItemClick = async () => {
    console.log("onCancel type:", typeof onCancel); // Detta bör logga 'function'

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
        <select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          onBlur={() => setItemTypeTouched(true)}
        >
          <option value="">Select Type</option>
          <option value="accessory">Accessory</option>
          <option value="trampoline">Trampoline</option>
        </select>
        {itemTypeTouched && itemTypeError && (
          <div className="error-message">{itemTypeError}</div>
        )}
        <button
          className="addNewItem-btn"
          onClick={handleAddItemClick}
          disabled={!isValid}
        >
          Add Product
        </button>
        <button className="addNewItem-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddItems;

// import { useState, useEffect } from "react";
// import { addProduct } from "../data/crud.js";

// const AddItems = ({ onProductAdded, onCancel }) => {
//   const [itemName, setItemName] = useState("");
//   const [itemType, setItemType] = useState("");
//   const [itemPrice, setItemPrice] = useState("");
//   const [itemImage, setItemImage] = useState("");
//   const [isValid, setIsValid] = useState(false);
//   const [itemNameError, setItemNameError] = useState("");
//   const [itemTypeError, setItemTypeError] = useState("");
//   const [itemPriceError, setItemPriceError] = useState("");
//   const [itemNameTouched, setItemNameTouched] = useState(false);
//   const [itemTypeTouched, setItemTypeTouched] = useState(false);
//   const [itemPriceTouched, setItemPriceTouched] = useState(false);

//   useEffect(() => {
//     validateFields();
//   });

//   const validateFields = () => {
//     let valid = true;
//     if (itemName.trim() === "") {
//       setItemNameError("Product name is required.");
//       valid = false;
//     } else {
//       setItemNameError("");
//     }
//     if (itemType.trim() === "") {
//       setItemTypeError("Product type required.");
//       valid = false;
//     } else {
//       setItemTypeError("");
//     }

//     if (itemPrice.trim() === "") {
//       setItemPriceError("Price is required.");
//       valid = false;
//     } else if (isNaN(parseFloat(itemPrice))) {
//       setItemPriceError("Price must be a number.");
//       valid = false;
//     } else {
//       setItemPriceError("");
//     }

//     setIsValid(valid);
//   };

//   const handleAddItemClick = async () => {
//     setItemNameTouched(true);
//     setItemPriceTouched(true);

//     if (!isValid) {
//       validateFields(); // Validate fields to ensure error messages are updated
//       return;
//     }

//     const newProduct = {
//       name: itemName,
//       price: parseFloat(itemPrice),
//       type: itemType,
//       image: itemImage || null, // Assume 'null' if no image is specified
//     };
//     const added = await addProduct(newProduct);
//     if (added) {
//       onProductAdded(); // Update the product list in the parent component
//       // onCancel(); // Close the form
//     }
//   };

//   return (
//     <div className="container-additem">
//       <div className="add-item-input">
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           onBlur={() => setItemNameTouched(true)}
//         />
//         {itemNameTouched && itemNameError && (
//           <div className="error-message">{itemNameError}</div>
//         )}
//         <input
//           type="number"
//           placeholder="Price"
//           value={itemPrice}
//           onChange={(e) => setItemPrice(e.target.value)}
//           onBlur={() => setItemPriceTouched(true)}
//         />
//         {itemPriceTouched && itemPriceError && (
//           <div className="error-message">{itemPriceError}</div>
//         )}
//         <input
//           type="text"
//           placeholder="type of product"
//           value={itemType}
//           onChange={(e) => setItemType(e.target.value)}
//           onBlur={() => setItemTypeTouched(true)}
//         />
//         {itemTypeTouched && itemTypeError && (
//           <div className="error-message">{itemTypeError}</div>
//         )}
//         <input
//           type="text"
//           placeholder="Image URL (optional)"
//           value={itemImage}
//           onChange={(e) => setItemImage(e.target.value)}
//         />
//         <button
//           className="addNewItem-btn"
//           onClick={handleAddItemClick}
//           disabled={!isValid}
//         >
//           Add Product
//         </button>
//         <button className="addNewItem-btn" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddItems;

// // import { useState, useEffect } from "react";
// // import { addProduct } from "../data/crud.js";

// // const AddItems = ({ onProductAdded, onCancel }) => {
// //   const [itemName, setItemName] = useState("");
// //   const [itemPrice, setItemPrice] = useState("");
// //   const [itemImage, setItemImage] = useState("");
// //   const [isValid, setIsValid] = useState(false);
// //   const [itemNameError, setItemNameError] = useState("");
// //   const [itemPriceError, setItemPriceError] = useState("");
// //   const [itemNameTouched, setItemNameTouched] = useState(false);
// //   const [itemPriceTouched, setItemPriceTouched] = useState(false);

// //   useEffect(() => {
// //     validateFields();
// //   });

// //   const validateFields = () => {
// //     let valid = true;
// //     if (itemName.trim() === "") {
// //       setItemNameError("Product name is required.");
// //       valid = false;
// //     } else {
// //       setItemNameError("");
// //     }

// //     if (itemPrice.trim() === "") {
// //       setItemPriceError("Price is required.");
// //       valid = false;
// //     } else if (isNaN(parseFloat(itemPrice))) {
// //       setItemPriceError("Price must be a number.");
// //       valid = false;
// //     } else {
// //       setItemPriceError("");
// //     }

// //     setIsValid(valid);
// //   };

// //   const handleAddItemClick = async () => {
// //     // Force all fields to be touched to show all errors
// //     setItemNameTouched(true);
// //     setItemPriceTouched(true);

// //     if (!isValid) {
// //       validateFields(); // Validate fields to ensure error messages are updated

// //       return;
// //     }

// //     const newProduct = {
// //       name: itemName,
// //       price: parseFloat(itemPrice),
// //       image: itemImage || null, // Assume 'null' if no image is specified
// //     };
// //     await addProduct(newProduct);
// //     onProductAdded(); // Call the callback function to update the product list in the parent component
// //     setItemName("");
// //     setItemPrice("");
// //     setItemImage("");
// //     setItemNameTouched(false);
// //     setItemPriceTouched(false);
// //   };

// //   return (
// //     <div className="container-additem">
// //       <div className="add-item-input">
// //         <div className="add-item">
// //           <input
// //             type="text"
// //             placeholder="Product Name"
// //             value={itemName}
// //             onChange={(e) => setItemName(e.target.value)}
// //             onBlur={() => setItemNameTouched(true)}
// //           />
// //           {itemNameTouched && itemNameError && (
// //             <div className="error-message">{itemNameError}</div>
// //           )}
// //           <input
// //             type="number"
// //             placeholder="Price"
// //             value={itemPrice}
// //             onChange={(e) => setItemPrice(e.target.value)}
// //             onBlur={() => setItemPriceTouched(true)}
// //           />
// //           {itemPriceTouched && itemPriceError && (
// //             <div className="error-message">{itemPriceError}</div>
// //           )}
// //           <input
// //             type="text"
// //             placeholder="Image URL (optional)"
// //             value={itemImage}
// //             onChange={(e) => setItemImage(e.target.value)}
// //           />
// //           <button
// //             className="addNewItem-btn"
// //             onClick={handleAddItemClick}
// //             disabled={!isValid}
// //           >
// //             Add Product
// //           </button>
// //           <button className="addNewItem-btn" onClick={onCancel}>
// //             Cancel
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddItems;
