import React from 'react';
import { Outlet } from "react-router-dom"
import CarOwnerSignup from "../page/carOwner/signup";

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
      }
    ]
  }

  export default CarOwnerRoute;