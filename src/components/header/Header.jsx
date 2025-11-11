import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';
import Logo from './Logo';
import NavMenus from './NavMenus';

function Header() {
  const { user } = useGlobalContext();
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
    <header className="header fixed top-0 left-0 z-10 h-[50px] w-full bg-(--header-bg) px-2 shadow-md shadow-black/2 backdrop-blur-sm transition-[box-shadow,background-color] duration-150 md:h-[65px] md:px-3">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-2 md:gap-4">
        <Logo
          hideText={hideLogoText ? true : false}
          onClick={() => window.location.reload()}
        />
        <NavMenus />
      </div>
    </header>
  );
}

export default Header;
