import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';
import { ToastContainer } from 'kitzo/react';

function App() {
  const { isDark, interactionDisabled } = useGlobalContext();

  return (
    <div
      className={`bg-(--main-bg) text-(--main-text-clr) transition-colors duration-150`}
    >
      {interactionDisabled && (
        <div className="fixed inset-0 z-50 cursor-not-allowed bg-white/20"></div>
      )}

      <Outlet />
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
