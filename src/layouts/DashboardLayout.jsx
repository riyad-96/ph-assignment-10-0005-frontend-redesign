import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, House, User, Users, Link2, Bell, Search } from 'lucide-react';
import ThemeToggler from '../components/header/ThemeToggler';
import { useGlobalContext } from '../contexts/GlobalContext';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: House },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/partner-profile', label: 'Partner Profile', icon: Users },
  { to: '/dashboard/connections', label: 'My Connections', icon: Link2 },
];

export default function DashboardLayout() {
  const { userProfile, user } = useGlobalContext();
  const [photoStatus, setPhotoStatus] = useState('loading');

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 767);

  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-gray-200 bg-(--white) transition-[background-color,border-color,width] duration-[150ms,150ms,300ms] dark:border-gray-800 ${
          isSidebarOpen ? 'w-50' : 'w-[55px]'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-2.5 transition-colors duration-150 dark:border-gray-800">
            {isSidebarOpen && (
              <button
                onClick={() => navigate('/')}
                className="bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-lg font-medium font-semibold text-transparent dark:from-indigo-400 dark:to-purple-400"
              >
                StudyMate
              </button>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  replace
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2.25 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-linear-to-br from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`
                  }
                  title={!isSidebarOpen ? link.label : undefined}
                >
                  <Icon size={20} className="shrink-0" />
                  {isSidebarOpen && (
                    <span className="shrink-0">{link.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-(--white) px-2 transition-colors duration-150 md:px-3 dark:border-gray-800">
          <div className="flex flex-1 items-center justify-end gap-4">
            <ThemeToggler />

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-1.5 transition-colors duration-150 dark:border-gray-700">
              <div className="flex size-8 items-center justify-center rounded-full text-white shadow">
                <div
                  className={`size-full ${photoStatus === 'loaded' ? '' : 'hidden'}`}
                >
                  <img
                    className={`size-full rounded-full object-cover object-center`}
                    onLoad={() => setPhotoStatus('loaded')}
                    src={userProfile?.profileImage}
                    alt={`Profile photo of ${userProfile?.name}`}
                  />
                </div>

                <User
                  className={`${photoStatus === 'loaded' ? 'hidden' : ''}`}
                  size={16}
                />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {userProfile?.name || user.displayName}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
