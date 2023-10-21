import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../page/user/login';
import SignUp from '../page/user/signUp';
import UserLogout from '../page/user/logout';
import Home from '../page/user/home';
import Navbar from '../component/navbar';
import CarDetails from '../page/user/carMoreDetails';
import PhoneNav from '../component/phoneNav';
import IsLogout from '../middleware/user/isLogout';
import IsLogged from '../middleware/user/isLogged';
import { ToastContainer } from 'react-toastify';
import UserProfile from '../page/user/profile';
import CarRentalCheckout from '../component/user/checkout';

const UserAppLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet />
    <PhoneNav/>
    <ToastContainer/>
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
      element:
      <>
      <IsLogout/>
      <Login />
      </> ,
    },
    {
      path: 'signup',
      element: 
      <>
      <IsLogout/>
      <SignUp />
      </>,
    },
    {
      path: 'logout',
      element: 
      <>
      <IsLogged/>
      <UserLogout />
      </>,
    },
    {
      path: '/',
      element: <UserAppLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'cars/more-details/:carId',
          element:<CarDetails/>
        },
        {
          path:'checkout/:carId',
          element:<CarRentalCheckout/>
        },
        {
          path:'profile',
          element:<UserProfile/>,
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
