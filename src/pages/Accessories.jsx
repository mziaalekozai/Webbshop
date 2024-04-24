import "../styles/Accessories.css";
import image5 from "../assets/image/image5.jpg";
import AddToCart from "../components/AddToCart";
import UseCartStore from "../data/UseCartStore.js";
const Accessories = () => {
  const findQuantity = (itemId) => {
    const cartItems = UseCartStore((state) => state.cartItems);
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };
  return (
    <div className="container">
      <div className="items">
        <img className="item-img" src={image5} alt="image1" />
        <p className="item-info">Universalstege till studsmatta 60-100 cm</p>
        <p className="item-price">Pris: 299 kr</p>
        <div className="add-to-cart">
          <AddToCart quantity={findQuantity()} />
        </div>
      </div>
    </div>
  );
};

export default Accessories;
