// import React, { useState, useEffect } from "react";
// import "../App.css";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar.jsx";
// import Footer from "../components/Footer.jsx";
// import Login from "../components/Login.jsx"; // Importera Login komponent

// const Root = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Kontrollera om användaren är inloggad när komponenten laddas
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loggedIn);
//   }, []);

//   const handleLogin = (success) => {
//     setIsLoggedIn(success);
//     localStorage.setItem("isLoggedIn", success ? "true" : "false");
//   };

//   return (
//     <div className="root">
//       <Navbar />
//       <main>
//         {isLoggedIn ? (
//           <Outlet /> // Visa barnkomponenter om inloggad
//         ) : (
//           <Login onLogin={handleLogin} /> // Visa login-sida om inte inloggad
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Root;

import "../App.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
const Root = () => {
  return (
    <div>
      <div className="root">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
