import React from "react";
import { Outlet } from "react-router-dom";
import AdminLoginForm from "../page/admin/login";
import Dashboard from "../page/admin/dashboard";
import UserList from "../page/admin/usersList";
import AdminLogout from "../page/admin/logout";

const AdminAppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AdminRoute = {
  path: "/admin",
  element: <AdminAppLayout />,
  errorElement: <h1>Error</h1>,
  children: [
    {
      path: "login",
      element: <AdminLoginForm />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "users",
      element: <UserList />,
    },
    {
      path: "logout",
      element: <AdminLogout />,
    },
  ],
};
export default AdminRoute;
