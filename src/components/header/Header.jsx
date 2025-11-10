import Logo from './Logo';
import NavMenus from './NavMenus';

function Header() {
  return (
    <header className="header fixed top-0 left-0 z-5 h-[50px] w-full bg-(--header-bg) px-2 shadow-md shadow-black/2 backdrop-blur-sm transition-[box-shadow,background-color] duration-[200ms,900ms] md:h-[65px] md:px-3">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4">
        <Logo onClick={() => window.location.reload()} />
        <NavMenus />
      </div>
    </header>
  );
}

export default Header;
