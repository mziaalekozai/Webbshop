import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = user.email === "admin@admin.com"; // Adjust based on your admin logic
        const userData = { uid: user.uid, email: user.email, isAdmin };
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
