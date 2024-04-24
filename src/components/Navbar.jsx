import Logo from "../assets/image/logo.png";
import { IoCartSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import UseCartStore from "../data/UseCartStore";

const Navbar = () => {
  const totalQuantity = UseCartStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, null)
  );

  // const ShoppingCart = () => (
  //   <NavLink to="/cart">
  //     <div className="shoppingCart">
  //       <IoCartSharp className="shopping-Basket-icon" />
  //       {totalQuantity > 0 ? (
  //         <div className="CountCartItemShow">{totalQuantity}</div>
  //       ) : (
  //         <div className="CountCartItemHidden">{totalQuantity}</div>
  //       )}
  //     </div>
  // </NavLink>
  // );
  return (
    <div>
      <nav>
        <div className="nav-Left">
          <NavLink to="/trampoline">Studsmatta</NavLink>
          <NavLink to="/accessories">Tellbehör</NavLink>
        </div>
        <div className="nav-Center">
          <NavLink to="/">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink>
        </div>
        <div className="nav-Right">
          <NavLink to="/contact">Kontakt oss</NavLink>
          <NavLink to="/">Om oss</NavLink>
          <NavLink to="/cart">
            <div className="shoppingCart">
              <IoCartSharp className="shopping-Basket-icon" />
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
