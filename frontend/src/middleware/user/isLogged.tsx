import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useIsLogged = ()=> {
  const { success } = useSelector((state: any) => state.userAuth);
  console.log("hkk", success);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/login");
    }
  }, [success]);

}

export default useIsLogged;