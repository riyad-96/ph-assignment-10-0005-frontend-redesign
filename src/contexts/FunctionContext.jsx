import React, { createContext, useEffect } from 'react';
import { useGlobalContext } from './GlobalContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { toast } from 'kitzo/react';
import useAxios from '../hooks/useAxios';

const functionContext = createContext();

function FunctionContext({ children }) {
  const server = useAxios();

  const {
    user,
    setUser,
    appLoading,
    setAppLoading,
    setAllPartners,
    setTopStudyPartners,
    setPartnersLoading,
    setPartnerProfile,
    setPartnerProfileLoading,
  } = useGlobalContext();

  // user auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (credential) => {
      setUser(credential);
      setAppLoading(false);
    });

    return unsubscribe;
  }, []);

  // fetch base partners
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

  // fetch partner profile data
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await server.get('partner-profile/get');
        setPartnerProfile(res.data);
      } catch (err) {
        setPartnerProfile(null);
      } finally {
        setPartnerProfileLoading(false);
      }
    })();
  }, [user]);

  function toggleTheme() {}

  return (
    <functionContext.Provider value={{ toggleTheme }}>
      {children}
    </functionContext.Provider>
  );
}

export default FunctionContext;
