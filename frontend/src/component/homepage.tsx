import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user/authSlice';
type StateSlice ={
  userAuth: {}
}

function Homepage() {
    const dispatch = useDispatch();
    const data = useSelector((state : StateSlice )=> state?.userAuth );
    console.log('data', data)
  const handleLogout = ()=>{
    dispatch(logout());
  }
  return (
    <div>
      <h1>helo {data?.user?.firstName} {data?.user?.lastName}</h1>
      <button onClick={handleLogout} className='bg-red-800'>logout</button>
    </div>
  )
}

export default Homepage
