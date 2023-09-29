import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/user/authSlice';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const dispatch = useDispatch()
    dispatch(logout());
    const navigate = useNavigate();
    useLayoutEffect(()=>{
        navigate('/login');
    },[])
  return
}

export default UserLogout
