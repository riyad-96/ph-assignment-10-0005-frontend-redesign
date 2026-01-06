import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import Logo from './Logo';
import NavMenus from './NavMenus';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [hideLogoText, setHideLogoText] = useState(false);

  useEffect(() => {
    if (user) {
      setHideLogoText(false);
      return;
    }
    if (window.innerWidth < 500) {
      setHideLogoText(true);
    }

    function decideLogoTextHidden() {
      requestAnimationFrame(() => {
        const isSmall = window.innerWidth < 500;
        if (isSmall) {
          setHideLogoText(true);
        } else {
          setHideLogoText(false);
        }
      });
    }

    window.addEventListener('resize', decideLogoTextHidden);
    return () => {
      window.removeEventListener('resize', decideLogoTextHidden);
    };
  }, [user]);

  return (
    <header className="header fixed top-0 left-0 z-10 h-[50px] w-full bg-(--header-bg) px-2 shadow-md shadow-black/2 backdrop-blur-sm transition-[box-shadow,background-color,translate,scale] delay-[0ms,0ms,150ms] duration-[150ms,150ms,300ms] md:h-[65px] md:px-3">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-2 md:gap-4">
        <Logo
          hideText={hideLogoText ? true : false}
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.location.reload();
            }
          }}
        />

        <NavMenus />
      </div>
    </header>
  );
}

export default Header;
