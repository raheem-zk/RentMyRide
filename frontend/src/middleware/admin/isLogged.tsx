import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogged= ()=> {
  const { success } = useSelector((state: any) => state.adminAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/admin/login");
    }
  }, [success]);
  return null;
}

export default IsLogged;
