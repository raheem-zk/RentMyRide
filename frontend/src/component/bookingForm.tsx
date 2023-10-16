import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAxios } from "../axios/axios";
import { ErrorMessage, successMessage } from "../utils/utils";

const CarRentForm = ({ handleModal }) => {
  const navigate = useNavigate();
  const { success ,user } = useSelector((state: any) => state.userAuth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
    license: "",
    userId: user?._id,
  });

  const handleRentFormSubmition = async (e)=>{
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.pickupLocation ||
      !formData.pickupDate ||
      !formData.pickupTime ||
      !formData.dropoffDate ||
      !formData.dropoffTime ||
      !formData.license
    ) {
      return ErrorMessage("Please fill in all the required fields.");
    }
  
    if (formData.license.length !== 16) {
      return ErrorMessage("The license number is not correct.");
    }
    if (formData.phone.length !== 10) {
      return ErrorMessage("The phone number must be 10 characters long.");
    }
    
    try {
      const response = await userAxios.post("/rent-booking", formData);
      response?.data?.message=='success' && successMessage("Car booking is Success")
      handleModal()
    }catch (error){
      console.log('error', error);
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!success) {
      navigate("/login");
    }
  }, [success]);

  return (
    success && (
      <Modal
      isOpen={handleModal}
      onRequestClose={handleModal}
      contentLabel="Booking Form"
    >
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4">
          Car Rental Reservation Form
        </h2>
        <form
          onSubmit={handleRentFormSubmition}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Driver License Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="license"
                type="text"
                name="license"
                value={formData.license}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pickupLocation"
              >
                Pickup Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pickupLocation"
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dropoffLocation"
              >
                Dropoff Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dropoffLocation"
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pickupDate"
              >
                Pickup Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pickupDate"
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pickupTime"
              >
                Pickup Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pickupTime"
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dropoffDate"
              >
                Dropoff Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dropoffDate"
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dropoffTime"
              >
                Dropoff Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dropoffTime"
                type="time"
                name="dropoffTime"
                value={formData.dropoffTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book Car
              </button>
              <button
                onClick={handleModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  );
};

export default CarRentForm;
