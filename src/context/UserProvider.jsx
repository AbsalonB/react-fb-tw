import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => { 
      if (user) {
        const { uid, email, photoURL, displayName } = user;
        setUser({ uid, email, photoURL, displayName });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOutUser = () => signOut(auth);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, logOutUser, setLoading, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;