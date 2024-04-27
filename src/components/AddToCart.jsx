import PropTypes from "prop-types";
import UseCartStore from "../data/UseCartStore"; // Adjust the path as necessary

const AddToCart = ({ item, id, quantity }) => {
  const { updateQuantity, removeFromCart, addToCart } = UseCartStore(
    (state) => ({
      updateQuantity: state.updateQuantity,
      removeFromCart: state.removeFromCart,
      addToCart: state.addToCart,
    })
  );

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(id, -1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="quantityContainer">
      <button onClick={decrement} className="quantityButtonMinus">
        -
      </button>
      <div className="quantity">{quantity}</div>
      <button onClick={() => addToCart(item, 1)} className="quantityButtonPlus">
        +
      </button>
    </div>
  );
};

AddToCart.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default AddToCart;
