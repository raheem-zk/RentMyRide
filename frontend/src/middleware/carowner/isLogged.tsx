import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogged= ()=> {
  const { success } = useSelector((state: any) => state.carOwnerAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/car-owner/login");
    }
  }, [success]);
  return null;
}

export default IsLogged;
