import { useState } from "react";
import "../styles/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../data/fire";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLogin, setShowLogin] = useState(true); // Använd detta för att kontrollera om formuläret ska visas
  const { currentUser, setCurrentUser } = useAuth();

  // Valideringsfunktioner
  const validateEmail = (email) => {
    if (!email) {
      return "E-postadress är obligatorisk";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Ogiltigt e-postformat";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Lösenord är obligatoriskt";
    }
    return "";
  };

  // Hantera inloggning
  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));

    if (emailError || passwordError) {
      return; // Avbryt inloggning om det finns valideringsfel
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        isAdmin: userCredential.user.email === "admin@admin.com",
      });
    } catch (error) {
      setEmailError("Felaktig e-post eller lösenord.");
    }
  };

  // Stänga formuläret
  const handleClose = () => {
    setShowLogin(false);
  };

  if (!showLogin) return null; // Om showLogin är false, visa inte komponenten

  return (
    <div className="login-container">
      {currentUser ? (
        <div className="login-done">
          <p>Välkommen som Admin!</p>
          <p>Nu kan du lägga till och tabort eller andra produkten. </p>
          <button className="close-btn" onClick={handleClose}>
            Avbryt
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailError(validateEmail(email))}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordError(validatePassword(password))}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button className="login-btn" type="submit">
            Logga in
          </button>
          <button className="close-btn" onClick={handleClose}>
            Avbryt
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
