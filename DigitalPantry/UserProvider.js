import { useEffect, useState, createContext, useContext } from 'react';
import { generateUserDocument } from './API/firebaseMethods.js';
import { firebaseAuth } from './firebase';

export const UserContext = createContext(null);

/**
 * React Provider hook for watching user auth changing.
 *
 * @component
 */
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // Listens for changes in the authenticated user and updates internal state accordingly.
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export const getUser = () => useContext(UserContext);
