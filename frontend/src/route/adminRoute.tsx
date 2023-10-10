import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../page/admin/login";
import Dashboard from "../page/admin/dashboard";
import UserList from "../page/admin/usersList";
import AdminLogout from "../page/admin/logout";
import AdminFrame from "../component/adminComponent/adminFrame";
import Cars from "../page/admin/carsList";
import CarOwnersList from "../page/admin/carownersList";
import IsLogout from "../middleware/admin/isLogout";
import IsLogged from "../middleware/admin/isLogged";

const AdminAppLayout = () => {
  return (
    <>
      <AdminFrame />
    </>
  );
};

const AdminLoginLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AdminRoute = {
  path: "/admin",
  element: <AdminLoginLayout />,
  errorElement: <h1>Error</h1>,
  children: [
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
      path: "/admin",
      element: <AdminAppLayout />,
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
          path: "users",
          element: (
            <>
              <IsLogged />
              <UserList />
            </>
          ),
        },
        {
          path: "cars",
          element: (
            <>
              <IsLogged />
              <Cars />
            </>
          ),
        },
        {
          path: "car-owners",
          element: (
            <>
              <IsLogged />
              <CarOwnersList />
            </>
          ),
        },
      ],
    },
    {
      path: "logout",
      element: <AdminLogout />,
    },
  ],
};

export default AdminRoute;
