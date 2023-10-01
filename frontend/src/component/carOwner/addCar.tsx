import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const AddCar = () => {
    const [carDetails, setCarDetails] = useState({
        carName: '', // name of the car (string)
        brand: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        image: '', 
        transmission: '', // e.g., Automatic, Manual (string)
        category: '', // objectId FK referencing category.id (string or ObjectId)
        perDayPrice: 0, // per day rental price (number)
        description: '', // car description (string)
        fuelType: '', // array of fuel types FK referencing fuel_type.Petrol (string or array of ObjectId)
        });
      

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
    console.log('Car Details:', carDetails);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
    <ToastContainer/>
  <div className="max-w-md w-full space-y-8">
    <div className="text-center">
      <h2 className="text-4xl font-extrabold">
      Add Your Car Details
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
              Car Name
            </label>
            <input
              id="CarName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={carDetails?.carName}
              onChange={handleCarDetailsChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Car Brand
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={carDetails?.brand}
              onChange={handleCarDetailsChange}
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
            Model
          </label>
          <input
            id="age"
            name="age"
            type="number"
            max={80}
            min={18}
            autoComplete="age"
            required
            value={carDetails?.model}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Age"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Year
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            maxLength={10}
            autoComplete="tel"
            required
            value={carDetails?.year}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            color
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={carDetails?.color}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email Address"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            License Plate
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={carDetails?.licensePlate}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            transmission
          </label>
          <input
            id="pincode"
            name="pincode"
            type="number"
            maxLength={6}
            autoComplete="postal-code"
            required
            value={carDetails?.transmission}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Pincode"
          />
        </div>

        <div>
          <label
            htmlFor="license"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Category
          </label>
          <input
            id="license"
            name="license"
            type="text"
            autoComplete="license-number"
            required
            value={carDetails?.category}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="License"
          />
        </div>

        <div>
          <label
            htmlFor="place"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Description
          </label>
          <input
            id="place"
            name="place"
            type="text"
            autoComplete="address-level2"
            required
            value={carDetails?.description}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Place"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Per Day Price
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            required
            value={carDetails?.perDayPrice}
            onChange={handleCarDetailsChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Address"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mt-2"
          >
            Fuel Type
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            required
            value={carDetails?.fuelType}
            onChange={handleCarDetailsChange}
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
          {/* <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 flex justify-center"
          >
            Already have an account? Sign in
          </Link> */}
        </div>
      </div>
    </form>
  </div>
</div>
  );
};

export default AddCar;
