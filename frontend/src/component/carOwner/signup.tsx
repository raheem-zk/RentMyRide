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
    <div>
      <h2>Car Owner Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Owner Details</h3>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={ownerDetails.firstName}
              onChange={handleOwnerDetailsChange}
            />
          </label>
          {/* Add other owner details inputs here */}
        </div>

        <div>
          <h3>Car Details</h3>
          <label>
            Car Make:
            <input
              type="text"
              name="carMake"
              value={carDetails.carMake}
              onChange={handleCarDetailsChange}
            />
          </label>
          {/* Add other car details inputs here */}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CarOwnerSignup;
