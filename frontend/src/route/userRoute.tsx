import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../page/user/login';
import SignUp from '../page/user/signUp';
import UserLogout from '../page/user/logout';
import Home from '../page/user/home';

const UserAppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const UserRoute = {
  path: '/',
  element: <UserAppLayout />,
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'signup',
      element: <SignUp />,
    },
    {
      path: 'logout',
      element: <UserLogout />,
    },
    {
      path: '/',
      element: <Home />,
    },
  ],
};

export default UserRoute;
