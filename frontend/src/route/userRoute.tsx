import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../page/user/login';
import SignUp from '../page/user/signUp';
import UserLogout from '../page/user/logout';
import Home from '../page/user/home';
import Navbar from '../component/navbar';

const UserAppLayout = () => {
  return (
    <>
    <Navbar/>
      <Outlet />
    </>
  );
};

const UserAuthAppLayout =()=>{
  return (
    <Outlet/>
  )
}
const UserRoute = {
  path: '/',
  element: <UserAuthAppLayout />,
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
      // element: <Home />,
      element: <UserAppLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'car',
          element:'car page',
        }
      ]
    },
  ],
};

export default UserRoute;
