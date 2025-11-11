import { createContext, useContext, useState } from 'react';

const globalContext = createContext();

function GlobalContext({ children }) {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [interactionDisabled, setInteractionDisabled] = useState(false);

  // base partners
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [allPartners, setAllPartners] = useState([]);
  const [topStudyPartners, setTopStudyPartners] = useState([]);

  // partner profile
  const [partnerProfile, setPartnerProfile] = useState(null);

  // theme
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'dark') {
      return true;
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
        partnersLoading,
        setPartnersLoading,
        allPartners,
        setAllPartners,
        topStudyPartners,
        setTopStudyPartners,
        partnerProfile,
        setPartnerProfile,
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
