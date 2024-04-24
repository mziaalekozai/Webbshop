import "../styles/Trampoline.css";
import image1 from "../assets/image/image1.jpg";
import image3 from "../assets/image/image3.jpg";
import image4 from "../assets/image/image4.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";

const Tampoline = () => {
  const findQuantity = (itemId) => {
    const cartItems = UseCartStore((state) => state.cartItems);
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };
  return (
    <div className="container">
      {/* <h1>Tampoline</h1> */}
      <div className="items">
        <img className="item-img" src={image1} alt="image1" />
        <p className="item-info">
          EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart
        </p>
        <p className="item-price">Pris: 7 499 kr</p>
        <div className="add-to-cart">
          <AddToCart quantity={findQuantity()} />
        </div>
      </div>
      <div className="items">
        <img className="item-img" src={image4} alt="image1" />
        <p className="item-info">
          EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart
        </p>
        <p className="item-price">Pris: 7 499 kr</p>
        <div className="add-to-cart">
          <AddToCart quantity={findQuantity()} />
        </div>
      </div>
      <div className="items">
        <img className="item-img" src={image3} alt="image1" />
        <p className="item-info">
          EXIT Elegant Premium studsmatta 214x366cm med Deluxe skyddsnät - svart
        </p>
        <p className="item-price">Pris: 7 499 kr</p>
        <div className="add-to-cart">
          <AddToCart quantity={findQuantity()} />
        </div>
      </div>
    </div>
  );
};

export default Tampoline;
