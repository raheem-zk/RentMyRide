import React from "react";
import { Outlet } from "react-router-dom";
import CarOwnerSignup from "../page/carOwner/signup";
import Login from "../page/carOwner/login";
import Dashboard from "../page/carOwner/dashboard";
import Logout from "../page/carOwner/logout";
import AddCarPage from "../page/carOwner/addCar";
import CarOwnerFrame from "../component/carOwner/carOwnerFrame";
import IsLogout from "../middleware/carowner/isLogout";
import IsLogged from "../middleware/carowner/isLogged";

const CarAppLayout = () => {
  return <Outlet />;
};

const CarOwnerLayout = () => {
  return <CarOwnerFrame />;
};

const CarOwnerRoute = {
  path: "/car-owner",
  element: <CarAppLayout />,
  children: [
    {
      path: "signup",
      element: (
        <>
          <IsLogout />
          <CarOwnerSignup />
        </>
      ),
    },
    {
      path: "login",
      element: (
        <>
          <IsLogout />
          <Login />
        </>
      ),
    },
    {
      path: "logout",
      element: (
        <>
          <IsLogged />
          <Logout />
        </>
      ),
    },
    {
      path: "/car-owner",
      element: <CarOwnerLayout />,
      children: [
        {
          path: "dashboard",
          element: (
            <>
              <IsLogged />
              <Dashboard />
            </>
          ),
        },
        {
          path: "add-car",
          element: (
            <>
              <IsLogged />
              <AddCarPage />
            </>
          ),
        },
      ],
    },
  ],
};

export default CarOwnerRoute;
