import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';

const globalContext = createContext();

function GlobalContext({ children }) {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState(null);

  // user auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (credential) => {
      setUser(credential);
      setAppLoading(false);
    });

    return unsubscribe;
  }, []);

  const [interactionDisabled, setInteractionDisabled] = useState(false);

  return (
    <globalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        user,
        setUser,
        interactionDisabled,
        setInteractionDisabled,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContext;

export function useGlobalContext() {
  return useContext(globalContext);
}
