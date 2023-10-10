import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogout= ()=> {
  const { success } = useSelector((state: any) => state.carOwnerAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/car-owner/dashboard");
    }
  }, [success]);
  return null;
}

export default IsLogout;
