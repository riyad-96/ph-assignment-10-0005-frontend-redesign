import { createContext, useContext, useState } from 'react';

const globalContext = createContext();

function GlobalContext({ children }) {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [interactionDisabled, setInteractionDisabled] = useState(false);

  // partner profile
  const [userProfile, setUserProfile] = useState(null);

  // theme
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  return (
    <globalContext.Provider
      value={{
        appLoading,
        setAppLoading,
        user,
        setUser,
        interactionDisabled,
        setInteractionDisabled,
        userProfile,
        setUserProfile,
        isDark,
        setIsDark,
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
