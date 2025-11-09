import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import useAxios from '../hooks/useAxios';

const globalContext = createContext();
const server = useAxios();

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

  // fetch base partners
  const [allPartners, setAllPartners] = useState([]);
  const [topRatedPartners, setTopRatedPartners] = useState([]);

  useEffect(() => {
    if (appLoading) return;
    (async () => {
      try {
        const res = await server.get('base-partner/all');
        setAllPartners(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [appLoading]);

  return (
    <globalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        user,
        setUser,
        interactionDisabled,
        setInteractionDisabled,
        allPartners,
        setAllPartners,
        topRatedPartners,
        setTopRatedPartners,
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
