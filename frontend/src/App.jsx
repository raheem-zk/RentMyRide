import Test from "./component/test";
import UserLogin from "./component/userLogin";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./user/page/login";

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
          path: "/",
          element: <Login/>,
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
