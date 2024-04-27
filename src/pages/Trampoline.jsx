import "../styles/Trampoline.css";
import image1 from "../assets/image/image1.jpg";
// import image3 from "../assets/image/image3.jpg";
// import image4 from "../assets/image/image4.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
// import { getItems } from "../data/crud.js";
// import TrampolineItems from "../components/TrampolineItems.jsx";
// import { useStore } from "../data/store.js";
// src/components/TrampolineList.jsx
import { useEffect, useState } from "react";
import { db } from "../data/fire.js";
import { collection, getDocs } from "firebase/firestore";

const Trampoline = () => {
  const [trampolines, setTrampolines] = useState([]);
  const cartItems = UseCartStore((state) => state.cartItems); // Use hook at the top level

  useEffect(() => {
    const fetchTrampolines = async () => {
      const trampolineCollection = collection(db, "HappyHopperz");
      const trampolineSnapshot = await getDocs(trampolineCollection);
      if (trampolineSnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      const trampolineList = trampolineSnapshot.docs.map((doc) => doc.data());
      setTrampolines(trampolineList);
    };

    fetchTrampolines();
  }, []);

  const findQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container">
      {trampolines.map((trampoline, index) => (
        <div className="items" key={index}>
          <img src={`/assets/image/${trampoline.image}`} alt="Description" />

          <p>{trampoline.name}</p>
          <p className="item-price">Pris: {trampoline.price} kr</p>
          <div className="add-to-cart">
            <AddToCart quantity={findQuantity(trampoline.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trampoline;
//   return (
//     <div>
//       <h1>Trampolines</h1>
//       <ul>
//         {trampolines.map((trampoline, index) => (
//           <li key={index}>
//             <img src={trampoline.image} alt="" />
//             <p>{trampoline.name}</p>
//             <p>pris:{trampoline.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Trampoline;

// const Trampoline = ({ trampoline }) => {
//   const setTrampolines = useStore((state) => state.setTrampolines);

//   // const [tampoline, setTampoline] = useState([
//   //   { name: "testname", price: "testprice", key: "testkey" },
//   // ]);
//   // const handleGetItems = async () => {
//   //   setTampoline(await getItems());
//   // };
//   const findQuantity = (itemId) => {
//     const cartItems = UseCartStore((state) => state.cartItems);
//     const item = cartItems.find((item) => item.id === itemId);
//     return item ? item.quantity : 0;
//   };
//   return (
//     <div className="container">
//       {/* <TrampolineItems /> */}
//       {/* <h1>Tampoline</h1> */}
//       <div className="items">
//         <img className="item-img" src={image1} alt="image1" />
//         <p className="item-info">
//           {/* EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart */}
//           {trampoline.name}
//         </p>
//         <p className="item-price">
//           {trampoline.price}
//           {/* Pris: 7 499 kr */}
//         </p>
//         <div className="add-to-cart">
//           <AddToCart quantity={findQuantity()} />
//         </div>
//       </div>
//       {/* <div className="items">
//         <img className="item-img" src={image4} alt="image1" />
//         <p className="item-info">
//           EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart
//         </p>
//         <p className="item-price">Pris: 7 499 kr</p>
//         <div className="add-to-cart">
//           <AddToCart quantity={findQuantity()} />
//         </div>
//       </div>
//       <div className="items">
//         <img className="item-img" src={image3} alt="image1" />
//         <p className="item-info">
//           EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart
//         </p>
//         <p className="item-price">Pris: 7 499 kr</p>
//         <div className="add-to-cart">
//           <AddToCart quantity={findQuantity()} />
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Trampoline;
