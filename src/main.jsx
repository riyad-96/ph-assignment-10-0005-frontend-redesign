import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import HomeIndex from './components/home/HomeIndex.jsx';
import FindPartners from './components/home/FindPartners.jsx';
import Auth from './pages/auth/Auth.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ContextProvider from './contexts/ContextProvider.jsx';
import AppLoadingProtected from './routes/AppLoadingProtected.jsx';

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
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: '',
            element: <HomeIndex />,
          },
          {
            path: 'find-partners',
            element: <FindPartners />,
          },
        ],
      },
      {
        path: 'auth',
        element: <Auth />,
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
