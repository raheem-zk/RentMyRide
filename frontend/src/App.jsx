import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./page/user/login";
import SignUp from "./page/user/signUp";
import Test from "./component/test";

function App() {
  const AppLayout = ()=>{
    return(
        <>
         <Outlet/>  
        </>
    )
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path:'/signup',
          element: <SignUp/>
        },
        {
          path:'/test',
          element: <Test/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
