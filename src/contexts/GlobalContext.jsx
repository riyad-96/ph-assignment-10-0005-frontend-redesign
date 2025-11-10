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
  const [partnerProfileLoading, setPartnerProfileLoading] = useState(true);

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
        partnerProfileLoading,
        setPartnerProfileLoading,
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
