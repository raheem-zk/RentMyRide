import React from 'react';
import { Outlet } from "react-router-dom"
import CarOwnerSignup from "../page/carOwner/signup";
import Login from '../page/carOwner/login';
import Dashboard from '../page/carOwner/dashboard';
import Test from '../component/carOwner/test';

const CarAppLayout = ()=>{
    return (
        <>
          <Outlet />
        </>
      );
  }
  const CarOwnerRoute = {
    path:'/car-owner',
    element: <CarAppLayout/>,
    children:[
      {
        path:'signup',
        element: <CarOwnerSignup/>
      },
      {
        path:'login',
        element: <Login/>
      },
      {
        path:'dashboard',
        element: <Dashboard/>
      },
      {
        path:'test',
        element: <Test/>
      }
    ]
  }

  export default CarOwnerRoute;