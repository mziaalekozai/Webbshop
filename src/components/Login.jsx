import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../data/fire"; // Ensure path is correct
import { useAuth } from "../context/AuthContext.jsx"; // Using the custom hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useAuth(); // Using custom hook for cleaner code

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        isAdmin: userCredential.user.email === "admin@example.com", // Admin check
      });
      console.log("User logged in");
    } catch (error) {
      setError(`Login failed: ${error.message}`);
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log("User logged out");
    } catch (error) {
      setError(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div>
      {!currentUser ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      ) : (
        <div>
          <p>Welcome, {currentUser.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;

// import React, { useState, useContext } from "react";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { auth } from "../data/fire"; // Ensure correct import path
// import { AuthContext } from "../context/AuthContext.jsx"; // Correct import statement

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { currentUser, setCurrentUser } = useContext(AuthContext); // Correct usage

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       setCurrentUser({
//         uid: userCredential.user.uid,
//         email: userCredential.user.email,
//         isAdmin: userCredential.user.email === "admin@example.com", // Simplified admin check
//       });
//       console.log("User logged in");
//     } catch (error) {
//       setError("Login failed: " + error.message);
//       console.error("Login Error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       console.log("User logged out");
//     } catch (error) {
//       setError("Logout failed: " + error.message);
//     }
//   };

//   return (
//     <div>
//       {!currentUser ? (
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//           {error && <p>{error}</p>}
//         </form>
//       ) : (
//         <div>
//           <p>Welcome, {currentUser.email}!</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login; // Ensure this is the only default export in this file

// // import React, { useState, useContext } from "react";
// // import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// // import { auth } from "../data/fire"; // Anpassa denna import efter din mappstruktur
// // import { AuthContext } from "../context/AuthContext.jsx";
// // // import { useAuth } from "../context/AuthContext"; // Anpassa denna import efter din mappstruktur

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const { currentUser, setCurrentUser } = useContext(AuthContext);

// //   const handleLogin = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(
// //         auth,
// //         email,
// //         password
// //       );
// //       setCurrentUser({
// //         ...currentUser,
// //         uid: userCredential.user.uid,
// //         email: userCredential.user.email,
// //         isAdmin: true, // Detta bör hanteras mer säkert
// //       });
// //       console.log("User logged in");
// //     } catch (error) {
// //       setError("Login failed: " + error.message);
// //       console.error("Login Error:", error);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth);
// //       setCurrentUser(null);
// //       console.log("User logged out");
// //     } catch (error) {
// //       console.error("Logout Error:", error);
// //       setError("Logout failed: " + error.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       {!currentUser ? (
// //         <form onSubmit={handleLogin}>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="Email Address"
// //             required
// //           />
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="Password"
// //             required
// //           />
// //           <button type="submit">Login</button>
// //           {error && <p>{error}</p>}
// //         </form>
// //       ) : (
// //         <div>
// //           <p>Welcome, {currentUser.email}!</p>
// //           <button onClick={handleLogout}>Logout</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Login; // Kontrollera att detta är den enda 'default' exporten i filen

// // // import React, { useState, useContext } from "react";
// // // import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// // // import { auth } from "../data/fire"; // Ensure this is correctly pointing to your Firebase auth configuration
// // // import { AuthContext } from "../context/AuthContext"; // Make sure the path is correct

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [error, setError] = useState("");
// // //   const { currentUser, setCurrentUser } = useContext(AuthContext);

// // //   const handleLogin = async (event) => {
// // //     event.preventDefault();
// // //     try {
// // //       const userCredential = await signInWithEmailAndPassword(
// // //         auth,
// // //         email,
// // //         password
// // //       );
// // //       setCurrentUser({
// // //         ...currentUser,
// // //         uid: userCredential.user.uid,
// // //         email: userCredential.user.email,
// // //         isAdmin: true, // This should ideally be fetched from your user database
// // //       });
// // //       console.log("User logged in");
// // //     } catch (error) {
// // //       setError("Login failed: " + error.message);
// // //       console.error("Login Error:", error);
// // //     }
// // //   };

// // //   const handleLogout = async () => {
// // //     try {
// // //       await signOut(auth);
// // //       setCurrentUser(null);
// // //       console.log("User logged out");
// // //     } catch (error) {
// // //       console.error("Logout Error:", error);
// // //       setError("Logout failed: " + error.message);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       {!currentUser ? (
// // //         <form onSubmit={handleLogin}>
// // //           <input
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             placeholder="Email Address"
// // //             required
// // //           />
// // //           <input
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             placeholder="Password"
// // //             required
// // //           />
// // //           <button type="submit">Login</button>
// // //           {error && <p>{error}</p>}
// // //         </form>
// // //       ) : (
// // //         <div>
// // //           <p>Welcome, {currentUser.email}!</p>
// // //           <button onClick={handleLogout}>Logout</button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // // // import React, { useState } from "react";
// // // // import { auth } from "../data/fire.js"; // Adjust path as necessary
// // // // import { signInWithEmailAndPassword } from "firebase/auth";

// // // // const Login = () => {
// // // //   const [email, setEmail] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   const [error, setError] = useState("");

// // // //   const handleLogin = async (event) => {
// // // //     event.preventDefault();
// // // //     try {
// // // //       await signInWithEmailAndPassword(auth, email, password);
// // // //       console.log("User logged in");
// // // //     } catch (error) {
// // // //       setError("Login failed: " + error.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <form onSubmit={handleLogin}>
// // // //         <input
// // // //           type="email"
// // // //           value={email}
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           required
// // // //         />
// // // //         <input
// // // //           type="password"
// // // //           value={password}
// // // //           onChange={(e) => setPassword(e.target.value)}
// // // //           required
// // // //         />
// // // //         <button type="submit">Login</button>
// // // //         {error && <p>{error}</p>}
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;
