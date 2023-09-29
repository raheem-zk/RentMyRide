import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/authSlice";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {

    dispatch(logout());
    navigate("/login");
    
  }, []);

  return <div></div>;
}

export default UserLogout;
