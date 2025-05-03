import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute.jsx';
import { LayoutLoader } from './components/layout/Loaders.jsx';
import {Provider} from 'react-redux'
import store from './redux/store.js'


// Lazy-loaded components
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement.jsx'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const MessagesManagement = lazy(() => import('./pages/admin/MessageManagement.jsx'))


const user = true;

// Router configuration
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectRoute user={user} />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/chat/:chatId', element: <Chat /> },
          { path: '/group', element: <Groups /> },
        ],
      },
      {
        path: '/login',
        element: (
          <ProtectRoute user={!user} redirect="/">
            <Login />
          </ProtectRoute>
        ),
      },
      {
        path : '/admin',
        element : <AdminLogin/>
      },
      {
        path : '/admin/dashboard',
        element : <Dashboard/>
      },
      {
        path : '/admin/users-management',
        element : <UserManagement/>
      },
      {
        path : '/admin/chats-management',
        element : <ChatManagement/>
      },
      {
        path : '/admin/messages-management',
        element : <MessagesManagement/>
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

// Root rendering with global Suspense
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
      <Suspense fallback={<LayoutLoader/>}>
        <RouterProvider router={appRouter} />
      </Suspense>
      </div>
    </HelmetProvider>
    </Provider>
  </StrictMode>
);