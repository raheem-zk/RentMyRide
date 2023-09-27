import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./page/user/login";
import SignUp from "./page/user/signUp";
import Home from "./page/user/home";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";

// admin page
import AdminLogin from '../src/page/admin/login';
import Dashboard from "./page/admin/dashboard";
import UserList from "./page/admin/usersList";

const persistor = persistStore(store);

function App() {
  const UserAppLayout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };
  const AdminAppLayout =()=>{
    return (
      <>
        <Outlet />
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserAppLayout />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path:'/admin',
      element:<AdminAppLayout/>,
      errorElement: <h1>Error</h1>,
      children:[
        {
          path:'login',
          element: <AdminLogin/>
        },
        {
          path:'dashboard',
          element: <Dashboard/>
        },
        {
          path:'users',
          element:<UserList/>
        }
      ]
    }
  ]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
