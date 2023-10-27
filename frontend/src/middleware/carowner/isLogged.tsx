import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/carOwner/authSlice';

const IsLogged= ()=> {
  const { success } = useSelector((state: any) => state.carOwnerAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!success) {
      navigate("/car-owner/login");
    }
  }, [success]);

  useEffect(()=>{
    const token = localStorage.getItem("carOwnerToken");
    if(!token){
      dispatch(logout());
      navigate("/car-owner/login");
    }
  })
  return null;
}

export default IsLogged;
