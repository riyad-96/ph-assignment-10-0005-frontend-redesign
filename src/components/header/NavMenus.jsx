import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { toast } from 'kitzo/react';
import ThemeToggler from './ThemeToggler';

function NavMenus() {
  const { user } = useGlobalContext();

  const [dropDownShowing, setDropDownShowing] = useState(false);
  const [menuDropDownShowing, setMenuDropDownShowing] = useState(false);

  useEffect(() => {
    function closeDropDown(e) {
      if (e.target.closest('.profile-dropdown-open-btn')) return;
      if (e.target.closest('.profile-dropdown')) return;
      setDropDownShowing(false);
    }

    function closeMenuDropDown(e) {
      if (e.target.closest('.menu-dropdown-open-btn')) return;
      if (e.target.closest('.menu-dropdown')) return;
      setMenuDropDownShowing(false);
    }

    document.addEventListener('click', closeDropDown);
    document.addEventListener('touchstart', closeDropDown);
    document.addEventListener('click', closeMenuDropDown);
    document.addEventListener('touchstart', closeMenuDropDown);

    return () => {
      document.removeEventListener('click', closeDropDown);
      document.removeEventListener('touchstart', closeDropDown);
      document.removeEventListener('click', closeMenuDropDown);
      document.removeEventListener('touchstart', closeMenuDropDown);
    };
  }, []);

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="relative">
        <button
          onClick={() => setMenuDropDownShowing(true)}
          className={`menu-dropdown-open-btn flex items-center gap-1 rounded-md py-1 pr-2 pl-3 text-sm font-medium md:hidden ${menuDropDownShowing ? 'bg-(--nav-link-hover-bg)' : 'pointer-fine:hover:bg-(--nav-link-hover-bg)'}`}
        >
          <span>Menu</span>
          <span
            className={`grid translate-y-px transition-[rotate] duration-150 ${menuDropDownShowing ? '-rotate-180' : 'rotate-0'}`}
          >
            <ChevronDown size="14" />
          </span>
        </button>

        <nav
          className={`menu-dropdown flex origin-top-left items-center gap-0.5 duration-150 max-md:absolute max-md:top-[calc(100%+5px)] max-md:grid max-md:w-[180px] max-md:rounded-lg max-md:bg-(--dropdown-bg) max-md:p-1.5 max-md:shadow-md max-md:transition-[opacity,scale] ${menuDropDownShowing ? 'max-md:scale-100 max-md:opacity-100' : 'max-md:scale-80 max-md:opacity-0'}`}
        >
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 100)}
            to="/"
            children="Home"
            className={({ isActive }) =>
              `rounded-md px-3 py-1 text-sm max-md:py-1.5 md:font-medium ${isActive ? 'bg-(--nav-link-hover-bg)' : 'pointer-fine:hover:bg-(--nav-link-hover-bg)'}`
            }
          />
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 100)}
            to="/find-partners"
            children="Find Partners"
            className={({ isActive }) =>
              `rounded-md px-3 py-1 text-sm max-md:py-1.5 md:font-medium ${isActive ? 'bg-(--nav-link-hover-bg)' : 'pointer-fine:hover:bg-(--nav-link-hover-bg)'}`
            }
          />
          {user && (
            <>
              <NavLink
                onClick={() =>
                  setTimeout(() => setMenuDropDownShowing(false), 100)
                }
                to="/create-partner-profile"
                children="Create Partner Profile"
                className={({ isActive }) =>
                  `rounded-md px-3 py-1 text-sm max-md:py-1.5 md:font-medium ${isActive ? 'bg-(--nav-link-hover-bg)' : 'pointer-fine:hover:bg-(--nav-link-hover-bg)'}`
                }
              />
              <NavLink
                onClick={() =>
                  setTimeout(() => setMenuDropDownShowing(false), 100)
                }
                to="/my-connections"
                children="My Connections"
                className={({ isActive }) =>
                  `rounded-md px-3 py-1 text-sm max-md:py-1.5 md:font-medium ${isActive ? 'bg-(--nav-link-hover-bg)' : 'pointer-fine:hover:bg-(--nav-link-hover-bg)'}`
                }
              />
            </>
          )}
        </nav>
      </div>

      <div>
        {user ? (
          <div className="relative flex items-center gap-2">
            <ThemeToggler />

            <div className="relative size-[30px] overflow-hidden rounded-full shadow md:size-[35px]">
              <img
                className="size-full"
                src={user.photoURL}
                alt={`${user.displayName} photo`}
              />
              <button
                onClick={() => setDropDownShowing(true)}
                className="profile-dropdown-open-btn absolute inset-0 z-1"
              ></button>
            </div>

            <AnimatePresence>
              {dropDownShowing && (
                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="profile-dropdown absolute top-[calc(100%+5px)] right-0 grid w-[110px] origin-top-right rounded-lg bg-(--dropdown-bg) p-1.5 shadow-md"
                >
                  <Link
                    className="rounded-md py-1.5 text-start px-3 text-sm pointer-fine:hover:bg-(--nav-link-hover-bg)"
                    to="/profile"
                    children="Profile"
                  />
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      toast.success('Log out successful');
                    }}
                    className="rounded-md py-1.5 text-start px-3 text-sm pointer-fine:hover:bg-(--nav-link-hover-bg)"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              to="/auth/log-in"
              children="Login"
              className="rounded-md px-3 py-1 text-sm font-medium hover:underline"
            />
            <Link
              to="/auth/register"
              children="Register"
              className="rounded-md bg-(--nav-link-hover-bg) px-3 py-1 text-sm font-medium"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavMenus;
