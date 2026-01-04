import React, { createContext, useEffect } from 'react';
import { useGlobalContext } from './GlobalContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebase';
import serverAPI from '../utils/server';

const functionContext = createContext();

function FunctionContext({ children }) {
  const server = serverAPI();

  const { setUser, setAppLoading, setUserProfile, isDark } = useGlobalContext();

  // user auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (credential) => {
      setUser(credential);
      if (credential) {
        try {
          const response = await server.get('user/get');
          setUserProfile(response.data.userProfile);
        } catch {
          setUserProfile(null);
        }
      }

      setAppLoading(false);
    });

    return unsubscribe;
  }, []);

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
