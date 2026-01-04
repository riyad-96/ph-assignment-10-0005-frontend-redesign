import { createBrowserRouter } from 'react-router-dom';
import ContextProvider from '../contexts/ContextProvider';
import AppLoadingProtected from './AppLoadingProtected';
import { HeroUIProvider } from '@heroui/react';
import App from '../App';
import PageNotFound from '../pages/PageNotFound';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import FindPartners from '../pages/FindPartners';
import PageProtected from './PageProtected';
import Profile from '../pages/Profile';
import PartnerDetails from '../pages/PartnerDetails';
import CreatePartnerProfile from '../pages/CreatePartnerProfile';
import MyConnections from '../pages/MyConnections';
import Auth from '../pages/Auth';
import AuthProtected from './AuthProtected';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Support from '../pages/Support';
import Privacy from '../pages/Privacy';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContextProvider>
        <AppLoadingProtected>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </AppLoadingProtected>
      </ContextProvider>
    ),
    errorElement: (
      <ContextProvider>
        <AppLoadingProtected>
          <PageNotFound />
        </AppLoadingProtected>
      </ContextProvider>
    ),
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'partners',
            element: <FindPartners />,
          },
          {
            path: 'partner/:id',
            element: (
              <PageProtected>
                <PartnerDetails />
              </PageProtected>
            ),
          },
          {
            path: 'support',
            element: <Support />,
          },
          {
            path: 'privacy',
            element: <Privacy />,
          },
          {
            path: 'about',
            element: <About />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <PageProtected>
            <DashboardLayout />
          </PageProtected>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'profile', element: <Profile /> },
          { path: 'partner-profile', element: <CreatePartnerProfile /> },
          { path: 'connections', element: <MyConnections /> },
        ],
      },
      {
        path: 'auth',
        element: (
          <AuthProtected>
            <Auth />
          </AuthProtected>
        ),
        children: [
          {
            path: 'log-in',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
