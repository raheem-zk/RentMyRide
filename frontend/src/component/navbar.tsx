import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Navbar =()=> {
  const { success } = useSelector((state: any)=>state.userAuth);
  return (
 <div className="md:my-5   bg-white p-3  top-0 sticky z-50 shadow shadow-gray-200"> 
  <div className="container mx-auto my-3 flex items-center justify-between">
      <div id="logo" className="text-gray-950 text-2xl font-bold">
        RMR
      </div>

      <nav id="nav-items" className="space-x-4 md:block hidden">
        <Link to={'/'} className="text-gray-950 hover:text-yellow-500">
          HOME
        </Link>
        <Link to={'/cars'} className="text-gray-950 hover:text-yellow-500">
          CARS
        </Link>
        <Link to={'/chat'} className="text-gray-950 hover:text-yellow-500">
          CHATS
        </Link>
        <Link to={'/profile'} className="text-gray-950 hover:text-yellow-500">
          PROFILE
        </Link>
      </nav>
    <div className="md:flex hidden items-center ">

      {success ? 
      <Link className="text-gray-950 hover:text-yellow-500" to={'/logout'}>Logout</Link>: 
      <Link className="text-gray-950 hover:text-yellow-500" to={'/login'}>Login / Register</Link>
      }

    </div>
  </div>
</div>

  )
}

export default Navbar



