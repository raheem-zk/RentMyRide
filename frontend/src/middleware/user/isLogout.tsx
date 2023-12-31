import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogout= ()=> {
  const { success } = useSelector((state: any) => state.userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  return null;
}

export default IsLogout;
