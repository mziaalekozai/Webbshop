import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import UseCartStore from "../data/UseCartStore";
import { SlBasket } from "react-icons/sl";
const Navbar = () => {
  const totalQuantity = UseCartStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, null)
  );

  return (
    <div>
      <nav>
        <div className="nav-Left">
          <NavLink to="/">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink>
        </div>
        <div className="nav-Center">
          <NavLink to="/trampoline">Studsmatta</NavLink>
          <NavLink to="/accessories">Tillbehör</NavLink>
        </div>
        <div className="nav-Right">
          <NavLink to="/cart">
            <div className="shoppingCart">
              <SlBasket className="shopping-Basket-icon" />
              {totalQuantity > 0 ? (
                <div className="CountCartItemShow">{totalQuantity}</div>
              ) : (
                <div className="CountCartItemHidden">{totalQuantity}</div>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
