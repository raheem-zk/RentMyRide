import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/user/authSlice";
import { googleSigningAPI } from "../api/userApi";

function Google() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoogleSignin = async (token: any) => {
    const data: any = jwt_decode(token);
    
    const userData = await googleSigningAPI(data);
    dispatch(userLoggedIn(userData));
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <ToastContainer />
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            GoogleSignin(credentialResponse.credential);
          }}
          onError={() => {
            ErrorMessage("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Google;
