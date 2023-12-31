import React, { useState } from "react";
import { ErrorMessage, successMessage, validateEmail } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { updateProfileData } from "../../api/userApi";
import { updateData } from "../../redux/user/authSlice";
import { useDispatch } from "react-redux";
import { profileEditModal } from "../../models/models";

const EditProfile = ({ data }) => {
  const [user, setUser] = useState<profileEditModal>({
    _id: data?._id || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    place: data?.place || "",
    age: data?.age || "",
    address: data?.address || "",
    license: data?.license || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      address,
      license,
      place,
    }: profileEditModal = user;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !age ||
      !address ||
      !license ||
      !place
    ) {
      return ErrorMessage("Please fill all fields");
    }
    const emailResult = validateEmail(email);

    if (!emailResult) {
      return ErrorMessage(" Email address is incorrect");
    }

    if (typeof phoneNumber === "string" && phoneNumber.trim().length !== 10) {
      return ErrorMessage(
        "The phone number is not valid; please check your phone number"
      );
    }

    if (license.length != 16) {
      return ErrorMessage("Please check your license");
    }
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      age,
      address,
      license,
      place,
    };

    const response = await updateProfileData(data, user?._id);
    if (response) {
      successMessage("Your profile has been successfully updated");
      dispatch(updateData(data));
      navigate("/profile");
      return;
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/** Input Fields */}
          <div>
            <label htmlFor="firstName" className="text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user?.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user?.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              minLength={10}
              maxLength={10}
              value={user?.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="place" className="text-gray-600">
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              value={user?.place}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="age" className="text-gray-600">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              max={80}
              min={18}
              value={user?.age}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="address" className="text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user?.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="license" className="text-gray-600">
              License
            </label>
            <input
              type="text"
              id="license"
              name="license"
              maxLength={16}
              value={user?.license}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
