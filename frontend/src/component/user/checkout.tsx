import React, { useState } from "react";
import axios from "axios";

const CarRentalCheckout = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation for each field
    if (!pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!returnDate) newErrors.returnDate = "Return date is required";
    if (!location) newErrors.location = "Location is required";
    if (!email) newErrors.email = "Email is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // You should replace 'api/endpoint' with your actual API endpoint
        await axios.post("api/endpoint", {
          pickupDate,
          returnDate,
          location,
          email,
          firstName,
          lastName,
          phoneNumber,
          message,
        });
        setMessage("Success! Your booking has been confirmed.");
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="m-5 w-full mx-auto">
      <div className="p-5 rounded-md bg-gray-100">
        <form className="bg-white shadow-md rounded p-8 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pickupLocation"
                className="block text-gray-700 font-bold mb-2"
              >
                Pickup Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                placeholder="Enter Pickup Location"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="pickupDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="returnLocation"
                className="block text-gray-700 font-bold mb-2"
              >
                Return Location
              </label>
              <input
                type="text"
                id="returnLocation"
                placeholder="Enter Return Location"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                htmlFor="returnDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </form>

        <div className="p-5 rounded-md bg-gray-100">
          <div>
            <p className="text-xl font-bold mb-4">User Details</p>
            <form className="bg-white shadow-md rounded p-8 mb-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Driver Licence
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xl font-bold mb-4">Payment</p>
        {/* Add payment components here */}
      </div>
    </div>
  );
};

export default CarRentalCheckout;
