import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage } from "../utils/utils";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/user/authSlice";


function Google() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const GoogleSignin = async(token : any)=>{
    try {
      const data : any = jwt_decode(token);
      console.log('daa', data)
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/google-signin`,data)
      .then((res)=>{
  
        localStorage.setItem("userToken", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        dispatch(userLoggedIn(res.data.userData));
  
        navigate('/');
      })
      .catch((err)=>{
        return ErrorMessage(err.response.data.message)
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <ToastContainer />
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
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
