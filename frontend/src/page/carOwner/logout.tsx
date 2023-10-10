import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/carOwner/authSlice";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    dispatch(logout());
    navigate("/car-owner/login");

  });
  
  return <></>;
};

export default Logout;
