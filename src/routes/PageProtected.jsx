import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Navigate, useLocation } from 'react-router-dom';

function PageProtected({ children }) {
  const { user } = useGlobalContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/log-in" state={location.pathname} />;
  }
  return children;
}

export default PageProtected;
