import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLoggedOut= ()=> {
  const { success } = useSelector((state: any) => state.userAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

}

export default IsLoggedOut;
