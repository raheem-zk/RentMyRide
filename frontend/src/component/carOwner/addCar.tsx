import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../../axios/axios";
import Dropdown from "../dropdown";
import AddBrand from "./addBrand";

const AddCar = () => {
  useEffect(()=>{
    GetDropdownIteams();
  },[]);
  const [brand, setBrand] = useState(['bmw','oudi','maruthi']);
  const [ category, setCategory] = useState([]);

  const GetDropdownIteams = async()=>{
    axiosInstance('carOwner').get('/car-owner/add-car')
    .then((res)=>{
      setBrand(res.data.brand);
      setCategory(res.data.category);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const [carDetails, setCarDetails] = useState({
    carName: "", // name of the car (string)
    brand: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    image: "",
    transmission: "", // e.g., Automatic, Manual (string)
    category: "", // objectId FK referencing category.id (string or ObjectId)
    perDayPrice: 300, // per day rental price (number)
    description: "", // car description (string)
    fuelType: "", // array of fuel types FK referencing fuel_type.Petrol (string or array of ObjectId)
  });

  const handleCarDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log("Car Details:", carDetails);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer/>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Add Your Car Details</h2>
          <p className="mt-2">Join RentMyRide today!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="carName"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Car Name
                </label>
                <input
                  id="carName"
                  name="carName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={carDetails.carName}
                  onChange={handleCarDetailsChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Car Name"
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Car Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={carDetails.brand}
                  onChange={handleCarDetailsChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Car Brand"
                />
              </div>
              <div>
                <Dropdown data={brand} title={'brand'} AddingForm={AddBrand} HandleForm={AddBrand}/>
              </div>
            </div>

            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Model
              </label>
              <input
                id="model"
                name="model"
                type="text"
                autoComplete="model"
                required
                value={carDetails.model}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Model"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                autoComplete="year"
                required
                value={carDetails.year}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Year"
              />
            </div>

            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Color
              </label>
              <input
                id="color"
                name="color"
                type="text"
                autoComplete="color"
                required
                value={carDetails.color}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Color"
              />
            </div>

            <div>
              <label
                htmlFor="licensePlate"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                License Plate
              </label>
              <input
                id="licensePlate"
                name="licensePlate"
                type="text"
                autoComplete="license-plate"
                required
                value={carDetails.licensePlate}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="License Plate"
              />
            </div>

            <div>
              <label
                htmlFor="transmission"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Transmission
              </label>
              <input
                id="transmission"
                name="transmission"
                type="text"
                autoComplete="transmission"
                required
                value={carDetails.transmission}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Transmission"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                autoComplete="category"
                required
                value={carDetails.category}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Category"
              />
            </div>

            <div>
              <label
                htmlFor="perDayPrice"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Per Day Price
              </label>
              <input
                id="perDayPrice"
                name="perDayPrice"
                type="number"
                autoComplete="perDayPrice"
                required
                value={carDetails.perDayPrice}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Per Day Price"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                autoComplete="description"
                required
                value={carDetails.description}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
              />
            </div>

            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Fuel Type
              </label>
              <input
                id="fuelType"
                name="fuelType"
                type="text"
                autoComplete="fuelType"
                required
                value={carDetails.fuelType}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Fuel Type"
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
