import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronDown,
  House,
  Users,
  LayoutDashboard,
  CircleHelp,
  Shield,
  Info,
  LogOut,
  User,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { toast } from 'kitzo';
import ThemeToggler from './ThemeToggler';

export default function NavMenus() {
  const { user, userProfile } = useGlobalContext();

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
          className={`menu-dropdown-open-btn flex items-center gap-1 rounded-md py-1 pr-2 pl-3 text-sm font-medium tracking-wide lg:hidden ${menuDropDownShowing ? 'bg-(--accent-color)' : 'pointer-fine:hover:bg-(--accent-color)'}`}
        >
          <span>Menu</span>
          <span
            className={`grid translate-y-px transition-[rotate] duration-150 ${menuDropDownShowing ? '-rotate-180' : 'rotate-0'}`}
          >
            <ChevronDown size="14" />
          </span>
        </button>

        <nav
          className={`menu-dropdown menu-dropdown-shadow flex origin-top-left items-center gap-0.5 tracking-wide duration-150 max-lg:absolute max-lg:top-[calc(100%+5px)] max-lg:grid max-lg:w-47.5 max-lg:rounded-lg max-lg:bg-(--dropdown-bg) max-lg:p-1.5 max-lg:transition-[opacity,scale,background-color] pointer-fine:cursor-pointer ${menuDropDownShowing ? 'max-lg:pointer-events-auto max-lg:scale-100 max-lg:opacity-100' : 'max-lg:pointer-events-none max-lg:scale-80 max-lg:opacity-0'}`}
        >
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 50)}
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                isActive
                  ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
              }`
            }
          >
            <House size={16} className="flex-shrink-0" />
            <span>Home</span>
          </NavLink>
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 50)}
            to="/partners"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                isActive
                  ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
              }`
            }
          >
            <Users size={16} className="flex-shrink-0" />
            <span>Find Partners</span>
          </NavLink>
          {user && (
            <>
              <NavLink
                onClick={() =>
                  setTimeout(() => setMenuDropDownShowing(false), 50)
                }
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                    isActive
                      ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
                  }`
                }
              >
                <LayoutDashboard size={16} className="flex-shrink-0" />
                <span>Dashboard</span>
              </NavLink>
            </>
          )}
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 50)}
            to="/support"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                isActive
                  ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
              }`
            }
          >
            <CircleHelp size={16} className="flex-shrink-0" />
            <span>Support</span>
          </NavLink>
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 50)}
            to="/privacy"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                isActive
                  ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
              }`
            }
          >
            <Shield size={16} className="flex-shrink-0" />
            <span>Privacy</span>
          </NavLink>
          <NavLink
            onClick={() => setTimeout(() => setMenuDropDownShowing(false), 50)}
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 max-lg:py-2.5 ${
                isActive
                  ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)'
              }`
            }
          >
            <Info size={16} className="flex-shrink-0" />
            <span>About</span>
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggler />
        {user ? (
          <div className="relative flex items-center gap-2">
            <div className="relative size-7.5 overflow-hidden rounded-full bg-zinc-300 shadow md:size-8.75 dark:bg-zinc-700">
              <img
                draggable="false"
                className="size-full"
                src={userProfile?.profileImage || user.photoURL}
                alt={`${userProfile?.name || user.displayName} photo`}
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
                  className="profile-dropdown profile-dropdown-shadow absolute top-[calc(100%+5px)] right-0 grid w-36 origin-top-right rounded-xl border border-gray-200 bg-(--dropdown-bg) p-2 shadow-lg transition-[background-color] duration-150 dark:border-gray-700"
                >
                  <Link
                    onClick={() => setDropDownShowing(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 pointer-fine:hover:bg-(--accent-color)"
                    to="/dashboard/profile"
                  >
                    <User size={16} className="flex-shrink-0" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      toast.success('Log out successful', {
                        style: { color: 'black' },
                      });
                    }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-red-600 transition-colors duration-150 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    <LogOut size={16} className="flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/auth/log-in"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg dark:from-indigo-500 dark:to-purple-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
