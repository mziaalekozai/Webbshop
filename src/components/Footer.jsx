import React, { useState } from "react";
import "../styles/Footer.css";
import { RiFacebookCircleFill, RiLinkedinBoxFill } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import Login from "./Login.jsx";
import { useAuth } from "../context/AuthContext.jsx"; // Importera useAuth från din context

const Footer = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { currentUser, setCurrentUser } = useAuth(); // Använd useAuth för att få tillgång till currentUser och setCurrentUser

  // Funktion för att logga ut användaren
  const handleLogout = async () => {
    try {
      // Antag att du har en funktion för att hantera utloggning
      // await signOut(auth);
      setCurrentUser(null); // Återställ currentUser när utloggning är klar
      console.log("User logged out");
    } catch (error) {
      console.error(`Logout failed: ${error.message}`);
    }
  };

  // Funktion för att växla visning av inloggningsformuläret
  const toggleLogin = () => {
    if (currentUser) {
      handleLogout(); // Om användaren är inloggad, logga ut användaren
    } else {
      setShowLogin(!showLogin); // Annars, visa eller dölj inloggningsformuläret
    }
  };

  return (
    <footer>
      <p className="footer-text">Följ oss och håll dig informerad</p>
      <div className="social-icons">
        <RiLinkedinBoxFill className="linkedin" />
        <RiFacebookCircleFill className="facebook" />
        <BiLogoInstagramAlt className="instagram" />
        <AiFillTwitterCircle className="twitter" />
      </div>
      <div className="admin">
        <p onClick={toggleLogin} className="admin-button">
          {currentUser ? "Logga ut" : "Admin"}
        </p>
        {/* Villkorlig rendering baserad på showLogin tillståndet */}
        {showLogin && <Login />}
      </div>
    </footer>
  );
};

export default Footer;
