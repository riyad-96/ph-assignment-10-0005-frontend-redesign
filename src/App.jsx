import { Outlet } from 'react-router-dom';
import { useGlobalContext } from './contexts/GlobalContext';
import { ToastContainer, useWindowSize } from 'kitzo';

function App() {
  const { isDark, interactionDisabled } = useGlobalContext();
  const { screenWidth } = useWindowSize({ delay: 30 });

  return (
    <div
      className={`${isDark ? 'dark' : ''} bg-(--main-bg) text-(--main-text-clr) transition-colors duration-150`}
    >
      {interactionDisabled && (
        <div className="fixed inset-0 z-50 cursor-not-allowed bg-white/20"></div>
      )}

      <Outlet />
      <ToastContainer
        position={screenWidth < 600 ? 'top-center' : 'top-right'}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
