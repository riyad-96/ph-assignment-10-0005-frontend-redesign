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
    setUserProfile,
    isDark,
    setIsDark,
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
        toast.error('Error fetching partner data', {
          style: { color: 'black' },
        });
        console.error(err);
      } finally {
        setPartnersLoading(false);
      }
    })();
  }, [appLoading]);

  // fetch user profile data
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const response = await server.get('user/get');
        setUserProfile(response.data);
      } catch (err) {
        setUserProfile(null);
      }
    })();
  }, [user]);

  // saved theme info
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // icon listener
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function updateIcon(e) {
      document.querySelector('link[rel="icon"]')?.remove();

      const newIcon = document.createElement('link');
      newIcon.rel = 'icon';
      newIcon.type = 'image/svg+xml';
      newIcon.href = e.matches ? '/sm-logo-white.png' : '/sm-logo.png';
      document.head.appendChild(newIcon);
    }
    updateIcon({ matches: media.matches });

    media.addEventListener('change', updateIcon);
    return () => media.removeEventListener('change', updateIcon);
  }, []);

  return (
    <functionContext.Provider value={{}}>{children}</functionContext.Provider>
  );
}

export default FunctionContext;
