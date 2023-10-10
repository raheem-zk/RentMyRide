import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogout= ()=> {
  const { success } = useSelector((state: any) => state.adminAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/admin/dashboard");
    }
  }, [success]);
  return null;
}

export default IsLogout;
