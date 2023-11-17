import React from "react";
import ForgotPasswordFrame from "../forgotPasswordFrame";
import {
  forgotPassword,
  forgotPasswordOtpVerification,
  resetPassword,
} from "../../api/carOwnerApi";

const ForgotPassword = () => {
  return (
    <ForgotPasswordFrame
      forgotPassword={forgotPassword}
      forgotPasswordOtpVerification={forgotPasswordOtpVerification}
      resetPassword={resetPassword}
      role={"car-owner"}
    />
  );
};

export default ForgotPassword;
