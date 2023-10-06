import React from "react";
import { Outlet } from "react-router-dom";
import AdminLoginForm from "../page/admin/login";
import Dashboard from "../page/admin/dashboard";
import UserList from "../page/admin/usersList";
import AdminLogout from "../page/admin/logout";
import AdminFrame from "../component/adminComponent/adminFrame";
import VehicleList from "../page/admin/carsList";

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
      element: <AdminLoginForm />,
    },
    {
      path: "/admin",
      element: <AdminAppLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path:'cars',
          element:<VehicleList/>
        }
      ],
    },
    {
      path: "logout",
      element: <AdminLogout />,
    },
  ],
};

export default AdminRoute;
