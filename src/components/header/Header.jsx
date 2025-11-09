import Logo from './Logo';
import NavMenus from './NavMenus';

function Header() {
  return (
    <header className="fixed top-0 left-0 z-5 h-[50px] w-full bg-(--header-bg-clr) px-2 md:h-[65px] md:px-3">
      <div className="mx-auto flex h-full gap-4 max-w-[1440px] items-center">
        <Logo onClick={() => window.location.reload()} />
        <NavMenus />
      </div>
    </header>
  );
}

export default Header;
