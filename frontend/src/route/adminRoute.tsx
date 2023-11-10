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
import CarMoreDetails from "../page/admin/carMoreDetails";
import UserMoreDetails from "../page/admin/userMoreDetails";
import OwnerMoreDetails from "../page/admin/ownerMoreDetails";
import { ToastContainer } from "react-toastify";
import Orders from "../page/admin/orders";
import OrderMoreDetails from "../page/admin/orderMoreDetaisl";
import ErrorPage from "../component/error";

const AdminAppLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminFrame />
    </>
  );
};

const AdminLoginLayout = () => {
  return <Outlet />;
};

const AdminRoute = {
  path: "/admin",
  errorElement: <ErrorPage path={'/admin'}/>,
  element: <AdminLoginLayout />,
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
          path: "cars/:carId/more-details",
          element: (
            <>
              <IsLogged />
              <CarMoreDetails />
            </>
          ),
        },
        {
          path: "users/:userId/more-details",
          element: (
            <>
              <IsLogged />
              <UserMoreDetails />
            </>
          ),
        },
        {
          path: "car-owners/:ownerId/more-details",
          element: (
            <>
              <IsLogged />
              <OwnerMoreDetails />
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
        {
          path: "orders",
          element: (
            <>
              <IsLogged />
              <Orders />
            </>
          ),
        },
        {
          path: "orders/:orderId/more-details",
          element: (
            <>
              <IsLogged />
              <OrderMoreDetails />
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
