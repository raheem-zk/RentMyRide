import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, successMessage, validateEmail } from "../utils/utils";
import OtpComponent from "./otpForm";
import { otpVerification } from "../utils/userUtils";
import { signupAPI, signupVerify } from "../api/userApi";


const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | string>('');
  const [phoneNumber, setPhoneNumber] = useState<number| string>('');
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [optComponent, setOtpComponent] = useState<boolean>(false);

  const handleOtpComponet = () => {
    setOtpComponent(!optComponent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return ErrorMessage("Please fill in all the required fields.");
    }

    const emailResult = validateEmail(email);

    if (!emailResult) {
      return ErrorMessage(" Email address is incorrect");
    }

    if (phoneNumber !== null && phoneNumber.toString().length !== 10) {
      return ErrorMessage("Phone number must have exactly 10 digits.");
    }

    if (password.length < 7) {
      return ErrorMessage("Password must be at least 7 characters long.");
    }

    const result = await signupVerify(email,phoneNumber)
    if(result){
      handleOtpComponet()
    }
  };

  const sendSignupData = async ()=>{
    const userData = {
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password,
    };

    const response = await signupAPI(userData)
    if(response.data.message=='success'){
      successMessage('Signup Successful')
      return navigate('/login');
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Create an Account</h2>
          <p className="mt-2">Join RentMyRide today!</p>
        </div>
        {/* otp */}
        {optComponent && (
        <OtpComponent
          title={"Car Owner Signup Otp Verification"}
          handleOtp={otpVerification}
          toggleModal={handleOtpComponet}
          sendSignupData={sendSignupData}
        />
      )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 mt-2 "
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                max={80}
                min={18}
                autoComplete="age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Age"
              />
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Phone Number
              </label>
              <input
                id="phone-number"
                name="phone-number"
                type="number"
                maxLength={10}
                autoComplete="number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign Up
            </button>
            <div className="text-sm md:flex md:justify-between mt-2">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 flex justify-center"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
