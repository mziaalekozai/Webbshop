import { useState } from "react";
import useCartStore from "../data/UseCartStore";
import AddToCart from "../components/AddToCart";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, clearCart } = useCartStore((state) => ({
    cartItems: state.cartItems,
    clearCart: state.clearCart,
  }));
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (cartItems.length === 0) {
    if (checkoutComplete) {
      return (
        <div className="cart-empty">
          <div className="cart">
            <h1>Tack för beställning välkommen åter!</h1>
            <p>Betalning via faktura.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="cart-empty">
        <div className="cart">
          <h1>Kundvagn är tom..</h1>
        </div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setCheckoutComplete(true);
  };

  return (
    <div className="cart-Container">
      <div className="cart">
        <h1>Kundvagn</h1>
        <div className="car-item">
          {cartItems.map((item) => (
            <div className="menuItem" key={item.id}>
              <img className="image-item" src={item.image} alt="image " />
              <div className="menuItemInfo">
                <div className="name-Price">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Prise: {item.price} kr</p>
                </div>

                <AddToCart item={item} id={item.id} quantity={item.quantity} />
              </div>
            </div>
          ))}
        </div>
        <div className="totalInfo">
          <p>Total pris: </p>
          <p>{totalPrice} kr</p>
        </div>
        <div className="cart-btn">
          <button className="checkout-btn" onClick={handleCheckout}>
            Bekräfta köp
          </button>
          <p
            className="clearbtn"
            onClick={() => {
              clearCart();
              setCheckoutComplete(false);
            }}
          >
            Avbryta köp
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
