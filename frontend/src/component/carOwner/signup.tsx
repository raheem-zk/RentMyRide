import React, { useState } from "react";
import SignupForm from "./signupForm";
import AddCar from "./addCar";
import OtpComponent from "../otpForm";
import { otpVerification, ownerSignup } from "../../utils/carIteams";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [page, setPage] = useState(false);
  const [optComponent, setOtpComponent] = useState(false);
  const { carOwnerSignup, addCar } = useSelector((state: any) => state);
  const navigate = useNavigate();
  const HandlePage = () => {
    setPage(!page);
  };
  const handleOtpComponet = () => {
    setOtpComponent(!optComponent);
  };
  const sendSignupData = async () => {
    const result = await ownerSignup({
      ownerData: carOwnerSignup.ownerData,
      carDetails: addCar.carData,
    });
    if (result) {
      navigate("/car-owner/login");
    }
  };
  return (
    <div className="min-h-screen flex md:my-2 md:mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
      {optComponent && (
        <OtpComponent
          title={"Car Owner Signup Otp Verification"}
          handleOtp={otpVerification}
          toggleModal={handleOtpComponet}
          sendSignupData={sendSignupData}
        />
      )}
      {page ? (
        <SignupForm page={HandlePage} />
      ) : (
        <AddCar next={handleOtpComponet} HandlePage={HandlePage} />
      )}
    </div>
  );
}

export default Signup;
