import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/Home.jsx';
import FindPartners from './pages/FindPartners.jsx';
import Auth from './pages/Auth.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ContextProvider from './contexts/ContextProvider.jsx';
import AppLoadingProtected from './routes/AppLoadingProtected.jsx';
import CreatePartnerProfile from './pages/CreatePartnerProfile.jsx';
import MyConnections from './pages/MyConnections.jsx';
import AuthProtected from './routes/AuthProtected.jsx';
import PageProtected from './routes/PageProtected.jsx';
import { StrictMode } from 'react';
import PartnerDetails from './pages/PartnerDetails.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContextProvider>
        <AppLoadingProtected>
          <App />
        </AppLoadingProtected>
      </ContextProvider>
    ),
    errorElement: <PageNotFound />,
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
            path: 'partner-profile',
            element: (
              <PageProtected>
                <CreatePartnerProfile />
              </PageProtected>
            ),
          },
          {
            path: 'my-connections',
            element: (
              <PageProtected>
                <MyConnections />
              </PageProtected>
            ),
          },
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

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
);
