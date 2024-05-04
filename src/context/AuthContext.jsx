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

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext(); // Create a context object

// export const useAuth = () => useContext(AuthContext); // Hook to use context

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser({
//           uid: user.uid,
//           email: user.email,
//           isAdmin: user.email === "admin@example.com", // Replace with your admin condition
//         });
//       } else {
//         setCurrentUser(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // import { createContext, useContext, useState, useEffect } from "react";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";

// // export const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const auth = getAuth();
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         setCurrentUser({
// //           uid: user.uid,
// //           email: user.email,
// //           isAdmin: user.email === "admin@example.com", // Anpassa detta efter dina behov
// //         });
// //       } else {
// //         setCurrentUser(null);
// //       }
// //       setLoading(false);
// //     });

// //     return () => unsubscribe(); // Rensa prenumerationen
// //   }, []);

// //   const value = { currentUser, setCurrentUser };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // import React, { createContext, useContext, useState, useEffect } from "react";
// // // import { auth } from "../data/fire"; // Your Firebase auth import
// // // import { onAuthStateChanged } from "firebase/auth";

// // // export const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [currentUser, setCurrentUser] = useState(null);

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// // //       if (user) {
// // //         // Assuming isAdmin is determined by some attribute or role check
// // //         setCurrentUser({
// // //           uid: user.uid,
// // //           email: user.email,
// // //           isAdmin: user.isAdmin || false, // Modify according to your auth logic
// // //         });
// // //       } else {
// // //         setCurrentUser(null);
// // //       }
// // //     });

// // //     return () => unsubscribe(); // Cleanup subscription on unmount
// // //   }, []);

// // //   return (
// // //     <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // // Export useAuth hook for easy context consumption
// // // export function useAuth() {
// // //   return useContext(AuthContext);
// // // }

// // // // import React, { useContext, useState, useEffect, createContext } from "react";
// // // // import { auth } from "../data/fire.js"; // Adjust path as necessary

// // // // import { onAuthStateChanged } from "firebase/auth";

// // // // const AuthContext = createContext();

// // // // export function useAuth() {
// // // //   return useContext(AuthContext);
// // // // }

// // // // export const AuthProvider = ({ children }) => {
// // // //   const [currentUser, setCurrentUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// // // //       setCurrentUser(user);
// // // //       setLoading(false);
// // // //     });

// // // //     return unsubscribe; // Make sure to unsubscribe on component unmount
// // // //   }, []);

// // // //   const value = {
// // // //     currentUser,
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={value}>
// // // //       {!loading && children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };
