import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import AppLoader from '../components/loaders/AppLoader';

function AppLoadingProtected({ children }) {
  const { appLoading } = useGlobalContext();

  if (appLoading) {
    return <AppLoader />;
  }
  return children;
}

export default AppLoadingProtected;
