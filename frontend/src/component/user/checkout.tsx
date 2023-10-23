import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../utils/utils";
import { CarDetailsModel } from "../../models/models";
import dayjs from "dayjs";
import { clearBooking, setBookingData } from "../../redux/user/bookingSlice";
import { booking, makePayment } from "../../api/userApi";
import {loadStripe} from '@stripe/stripe-js';

const CarRentalCheckout = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userAuth);
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [carData, setCarData] = useState<CarDetailsModel | null>(null);

  const endDate = dayjs(carData?.endDate).format("YYYY-MM-DD");
  const startDate = dayjs(carData?.startDate).format("YYYY-MM-DD");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const [formData, setFormData] = useState({
    carId: carId,
    name: user?.firstName ?? "",
    email:user?.email ?? "",
    phone: user?.phoneNumber ?? "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropoffDate: "",
    dropoffTime: "",
    license: user?.license ?? "",
    address: user?.address ?? "",
    userId: user?._id,
    totalDays: 2,
    totalPrice: 0,
    perDayPrice: carData?.perDayPrice ?? "",
  });

  useEffect(() => {
    const car = cars.find((car) => car._id === carId);
    setCarData(car);
  }, []);

  useEffect(() => {
    const totalDays = dayjs(formData.dropoffDate).diff(
      dayjs(formData.pickupDate),
      "day"
    );
    setFormData({
      ...formData,
      totalDays: totalDays,
      totalPrice: parseInt(carData?.perDayPrice) * totalDays,
    });
  }, [formData.pickupDate, formData.dropoffDate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, perDayPrice: carData?.perDayPrice });

    if (
      !formData.pickupDate ||
      !formData.dropoffDate ||
      !formData.pickupLocation ||
      !formData.dropoffLocation ||
      !formData.pickupTime ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.license ||
      !formData.address ||
      !formData.totalDays ||
      !formData.totalPrice
    ) {
      return ErrorMessage("Please fill in all fields");
    }

    const pickupDate = new Date(formData.pickupDate);
    const dropoffDate = new Date(formData.dropoffDate);

    if (pickupDate > dropoffDate) {
      return ErrorMessage("The date is not correct");
    }
    if (formData.phone.length !== 10) {
      return ErrorMessage("The phone number should be 10 digits.");
    }

    if (formData.license.length !== 16) {
      return ErrorMessage("The license number should be 16 characters.");
    }
    dispatch(setBookingData(formData));
    const result = await booking(formData);
    result ? dispatch(clearBooking()): "";
    result ? navigate("/"): "";
  };

  const handlePaying = async ()=>{
    const data ={ amont : 1200}
    const response = await makePayment(data);
    const stripe = await loadStripe('pk_test_51O4M4wSJ9BVJ9pm9NmdXObj68T6yivv2vU9RbJdfNimryXkQWJfBuTR4RLlxPIj2urVTzANFEUCtZ5WMv0MOipjH00ph76GDPI');

    console.log(response,  response.data.clientSecret);
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.clientSecret,
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full mx-auto">
      <button onClick={handlePaying}>pay now</button>
      <form>
        <h1 className="p-3 text-center text-black text-2xl font-bold">
          Checkout page
        </h1>
        <div className="flex justify-between md:ml-10 p-4">
          <div className="flex">
            <div className="w-40">
              <img
                src={carData ? carData?.images[0] :''}
                alt="Car"
                className="max-w-full h-auto"
              />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{carData?.carName}</p>
              <p className="text-lg">{carData?.category?.name}</p>
              <p className="text-lg">{carData?.perDayPrice}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-8 mb-4">
          <div className="p-5 rounded-md bg-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Pickup Location
                </label>
                <input
                  required
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData?.pickupLocation}
                  onChange={handleChange}
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
                  required
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  min={
                    currentDate < startDate
                      ? startDate
                      : dayjs(currentDate).add(1, "day").format("YYYY-MM-DD")
                  }
                  max={dayjs(endDate).subtract(1, "day").format("YYYY-MM-DD")}
                  value={formData?.pickupDate}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="dropoffLocation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Return Location
                </label>
                <input
                  required
                  type="text"
                  id="dropoffLocation"
                  name="dropoffLocation"
                  value={formData?.dropoffLocation}
                  placeholder="Enter Return Location"
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoffDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Return Date
                </label>
                <input
                  required
                  type="date"
                  id="dropoffDate"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleChange}
                  min={
                    currentDate < startDate
                      ? startDate
                      : dayjs(currentDate).add(2, "day").format("YYYY-MM-DD")
                  }
                  max={endDate}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="pickupTime"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Pickup Time
                </label>
                <input
                  required
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  value={formData?.pickupTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="dropoffTime"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Return Time
                </label>
                <input
                  required
                  type="time"
                  id="dropoffTime"
                  name="dropoffTime"
                  value={formData?.dropoffTime}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-5 rounded-md bg-gray-100">
            <p className="text-xl font-bold mb-4">User Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
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
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
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
                  required
                  type="number"
                  maxLength={10}
                  minLength={10}
                  id="phone"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="driverLicence"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Driver License
                </label>
                <input
                  required
                  minLength={16}
                  maxLength={16}
                  type="text"
                  id="license"
                  name="license"
                  value={formData?.license}
                  onChange={handleChange}
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
                  required
                  type="text"
                  id="address"
                  name="address"
                  value={formData?.address}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <p className="text-xl font-bold mb-4">Price Details</p>
              <div className="bg-white shadow-md rounded p-8 mb-4">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Days:</span>
                    <span className="text-black font-bold">
                      {formData?.totalDays} days
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-black font-bold">
                    ₹{formData?.totalPrice}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-600 py-2 px-3 rounded-lg font-bold text-white"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarRentalCheckout;
