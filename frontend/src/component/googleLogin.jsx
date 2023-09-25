import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Google() {
  return (
    <GoogleOAuthProvider clientId="104374464103-p1e8um2tlhi5qmvv1i4g0ko4cb7l0bda.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Google;
