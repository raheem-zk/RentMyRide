import React from "react";
import { Outlet } from "react-router-dom";
import CarOwnerSignup from "../page/carOwner/signup";
import Login from "../page/carOwner/login";
import Dashboard from "../page/carOwner/dashboard";
import Logout from "../page/carOwner/logout";
import CarOwnerFrame from "../component/carOwner/carOwnerFrame";
import AddCarPage from "../page/carOwner/addCar";
import TestImage from "../component/carOwner/imageTest";

const CarAppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const CarOwnerLayout = () => {
  return (
      <CarOwnerFrame />
  );
};
const CarOwnerRoute = {
  path: "/car-owner",
  element: <CarAppLayout />,
  children: [
    {
      path: "signup",
      element: <CarOwnerSignup />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: "/car-owner",
      element: <CarOwnerLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "add-car",
          element: <AddCarPage/>,
        },
        {
          path:"test-add",
          element: <TestImage/>
        }
      ],
    },
  ],
};

export default CarOwnerRoute;
