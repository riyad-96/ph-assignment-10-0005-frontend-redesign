import { useGlobalContext } from '../contexts/GlobalContext';
import { Navigate, useLocation } from 'react-router-dom';

function AuthProtected({ children }) {
  const { user } = useGlobalContext();
  const location = useLocation();

  if (user) {
    if (location.state) {
      return <Navigate to={location.state} replace />;
    }
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AuthProtected;
