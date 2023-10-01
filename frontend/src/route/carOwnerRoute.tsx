import React from 'react';
import { Outlet } from "react-router-dom"
import CarOwnerSignup from "../page/carOwner/signup";
import Login from '../page/carOwner/login';
import Dashboard from '../page/carOwner/dashboard';

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
      }
    ]
  }

  export default CarOwnerRoute;