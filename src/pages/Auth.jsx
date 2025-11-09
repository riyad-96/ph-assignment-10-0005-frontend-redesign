import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/header/Logo';

function Auth() {
  const navigate = useNavigate();
  return (
    <div className="screen-height grid place-items-center overflow-y-auto p-4">
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/')} />
      </div>
      <div className="w-full max-w-[400px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
