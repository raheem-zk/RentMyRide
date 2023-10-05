import React, { useState, FormEvent } from "react";
import { ErrorMessage } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupAdd } from "../../redux/carOwner/signupSlice";
import { ToastContainer } from "react-toastify";
import { CarOwnerSignupForm } from "../../models/models";

const SignupForm: React.FC<{ page: () => void }> = ({ page }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CarOwnerSignupForm>({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    pincode: "",
    license: "",
    place: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName.trim() === "" ||
      formData.lastName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.pincode.trim() === "" ||
      formData.license.trim() === "" ||
      formData.place.trim() === "" ||
      formData.address.trim() === ""
    ) {
      return ErrorMessage("Please fill in all the required fields.");
    }
    if (formData.pincode.toString().length !== 6) {
      return ErrorMessage("Pincode must be a 6-digit number.");
    }

    if (formData.phoneNumber.toString().length !== 10) {
      return ErrorMessage("Phone number must be a 10-digit number.");
    }

    if (formData.license.length !== 16) {
      return ErrorMessage("License number must be a 16-character string.");
    }
    if (formData.password.length < 7) {
      return ErrorMessage("Password must be at least 7 characters long.");
    }

    console.log("Form Data:", formData);
    dispatch(signupAdd(formData));
    page();
  };
  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">
            Join RentMyRide as a Car Owner
          </h2>
          <p className="mt-2">Join RentMyRide today!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
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
                value={formData.age}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Age"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                maxLength={10}
                autoComplete="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="number"
                maxLength={6}
                autoComplete="postal-code"
                required
                value={formData.pincode}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Pincode"
              />
            </div>

            <div>
              <label
                htmlFor="license"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                License
              </label>
              <input
                id="license"
                name="license"
                type="text"
                autoComplete="license-number"
                required
                value={formData.license}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="License"
              />
            </div>

            <div>
              <label
                htmlFor="place"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Place
              </label>
              <input
                id="place"
                name="place"
                type="text"
                autoComplete="address-level2"
                required
                value={formData.place}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Place"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                required
                value={formData.address}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Next
            </button>
            <div className="text-sm md:flex md:justify-between mt-2">
              <Link
                to="/car-owner/login"
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

export default SignupForm;
