import PropTypes from "prop-types";
import UseCartStore from "../data/UseCartStore";
import "../styles/Accessories.css";

const AddToCart = ({ item, id, quantity }) => {
  const { updateQuantity, removeFromCart } = UseCartStore((state) => ({
    updateQuantity: state.updateQuantity,
    removeFromCart: state.removeFromCart,
  }));

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(id, -1);
    } else {
      removeFromCart(id);
    }
  };
  const { addToCart } = UseCartStore();

  return (
    <div className="quantityContainer">
      <button onClick={decrement} className="quantityButtonMinus">
        -
      </button>
      <div className="quantity">{quantity}</div>
      <button onClick={() => addToCart(item)} className="quantityButtonPlus">
        +
      </button>
    </div>
  );
};

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default AddToCart;
