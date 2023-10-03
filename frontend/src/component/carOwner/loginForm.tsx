import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorMessage } from "../../utils/utils";
import { SetCarOwner } from "../../redux/carOwner/authSlice";
import { carOwnerAxios } from "../../axios/axios";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    if (password.length < 7) {
      return ErrorMessage("Password must be at least 7 characters long.");
    }
    try {
      const res = await carOwnerAxios.post(`/login`,{ email, password });
      if (res.data.error) {
        return ErrorMessage(res.data.message);
      }
      localStorage.setItem("carOwner", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      console.log(res.data.userData);
      dispatch(SetCarOwner(res.data.userData));
      navigate("/car-owner/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Car Owner Login</h2>
          <p className="mt-2">Access Your Account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-400 focus:border-gray-200 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign in
            </button>
            <div className="text-sm md:flex md:justify-between mt-2">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500 flex justify-center"
              >
                Forgot your password?
              </Link>
              <Link
                to="/car-owner/signup"
                className="btn font-medium text-black-600 hover:text-black-900 flex justify-center"
              >
                Join RentMyRide as a Car Owner Today!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
