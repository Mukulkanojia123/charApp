import React, { lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useBeforeUnload } from 'react-router-dom';
import App from './App.jsx';
import ProtectRoute from './components/auth/ProtectRoute.jsx';



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

import axios from 'axios'
import { server } from './components/constants/config.js';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists, userExists } from './redux/reducers/auth.js';
import { LayoutLoader } from './components/layout/Loaders.jsx';


const Body = () => {

    const { user, loader } = useSelector((state) => state.auth);

    const dispatch  = useDispatch()

  useEffect(()=>{
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  },[dispatch])

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


  return loader? (
  <LayoutLoader/>
):(
    <>
        <RouterProvider router={appRouter} />
    </>
  )
}

export default Body