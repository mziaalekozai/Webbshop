import { createHashRouter } from "react-router-dom";
import Root from "./Root.jsx";
import HomePage from "../pages/HomePage.jsx";
import Cart from "../components/Cart.jsx";
import Trampoline from "../pages/Trampoline.jsx";
import Accessories from "../pages/Accessories.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "cart", element: <Cart /> },
      { path: "trampoline", element: <Trampoline /> },
      { path: "accessories", element: <Accessories /> },
    ],
  },
]);

export { router };
