import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import useAxios from '../hooks/useAxios';
import { toast } from 'kitzo/react';

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
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [allPartners, setAllPartners] = useState([]);
  const [topStudyPartners, setTopStudyPartners] = useState([]);

  useEffect(() => {
    if (appLoading) return;
    (async () => {
      try {
        const res = await server.get('base-partner/all');
        setAllPartners(
          res.data
            .map((p) => ({ obj: p, random: Math.random() }))
            .sort((a, b) => a.random - b.random)
            .map((obj) => obj.obj),
        );

        setTopStudyPartners(
          res.data.sort((a, b) => b.rating - a.rating).slice(0, 6),
        );
      } catch (err) {
        toast.error('Error fetching partner data');
        console.error(err);
      } finally {
        setPartnersLoading(false);
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
        partnersLoading,
        setPartnersLoading,
        allPartners,
        setAllPartners,
        topStudyPartners,
        setTopStudyPartners,
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
