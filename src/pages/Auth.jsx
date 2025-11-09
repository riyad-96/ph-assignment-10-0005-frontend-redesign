import { Outlet, useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();
  return (
    <div className="screen-height grid place-items-center overflow-y-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 text-xl font-medium"
      >
        Study Partner
      </button>
      <div className="w-full max-w-[400px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
