import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute.jsx';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const user = true;

// Router configuration with Suspense
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectRoute user={user} />,
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<div>Loading Home...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: '/chat/:chatId',
            element: (
              <Suspense fallback={<div>Loading Chat...</div>}>
                <Chat />
              </Suspense>
            ),
          },
          {
            path: '/group',
            element: (
              <Suspense fallback={<div>Loading Groups...</div>}>
                <Groups />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/login',
        element: (
          <ProtectRoute user={!user} redirect="/">
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </Suspense>
          </ProtectRoute>
        ),
      },
      {
        path : '*',
        element : (
          <Suspense fallback={<div>Loading Login...</div>}>
              <NotFound />
            </Suspense>
        )
      }
    ],
  },
]);

// Root rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <RouterProvider router={appRouter} />
    </HelmetProvider>
  </StrictMode>
);
