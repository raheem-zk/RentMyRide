import React, { useState } from 'react';

function CarOwnerSignup() {
  const [ownerDetails, setOwnerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [carDetails, setCarDetails] = useState({
    carMake: '',
    carModel: '',
    carYear: '',
    carColor: '',
    licensePlate: '',
  });

  const handleOwnerDetailsChange = (e) => {
    const { name, value } = e.target;
    setOwnerDetails({
      ...ownerDetails,
      [name]: value,
    });
  };

  const handleCarDetailsChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log('Owner Details:', ownerDetails);
    console.log('Car Details:', carDetails);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Car Owner Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="text-xl font-semibold mb-2">Owner Details</h3>
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="firstName"
              value={ownerDetails.firstName}
              onChange={handleOwnerDetailsChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          {/* Add other owner details inputs here */}
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Car Details</h3>
          <label className="block mb-2">
            Car Make:
            <input
              type="text"
              name="carMake"
              value={carDetails.carMake}
              onChange={handleCarDetailsChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          {/* Add other car details inputs here */}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CarOwnerSignup;
