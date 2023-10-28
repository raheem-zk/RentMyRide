import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../utils/utils";
import { CarDetailsModel } from "../../models/models";
import dayjs from "dayjs";
import { setBookingData } from "../../redux/user/bookingSlice";
import { makePayment } from "../../api/userApi";
import mongoose from "mongoose";

const CarRentalCheckout = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.userAuth);
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [carData, setCarData] = useState<CarDetailsModel | null>(null);

  const endDate = dayjs(carData?.endDate).format("YYYY-MM-DD");
  const startDate = dayjs(carData?.startDate).format("YYYY-MM-DD");
  const currentDate = dayjs().format("YYYY-MM-DD");

  const [formData, setFormData] = useState({
    orderId: "",
    carId: carId,
    name: user?.firstName ?? "",
    email: user?.email ?? "",
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
    paymentMethod: "card",
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
      perDayPrice: carData?.perDayPrice,
      totalPrice: parseInt(carData?.perDayPrice) * totalDays,
    });
  }, [formData.pickupDate, formData.dropoffDate]);

  useEffect(()=>{
    const orderIdObjectId = new mongoose.Types.ObjectId();

    setFormData({
      ...formData,
      orderId: orderIdObjectId.toString(),
    });
  },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      !formData.totalPrice ||
      !formData.paymentMethod
    ) {
      return ErrorMessage("Please fill in all fields");
    }

    const pickupDate = new Date(formData.pickupDate);
    const dropoffDate = new Date(formData.dropoffDate);

    if (pickupDate > dropoffDate) {
      return ErrorMessage("The date is not correct");
    }
    if (
      typeof formData.phone === "string" &&
      formData.phone.trim().length !== 10
    ) {
      return ErrorMessage("The phone number should be 10 digits.");
    }

    if (formData.license.length !== 16) {
      return ErrorMessage("The license number should be 16 characters.");
    }

    if (
      formData.paymentMethod == "wallet" &&
      user?.wallet?.balance >= formData.totalPrice
    ) {
      dispatch(setBookingData(formData));
      await makePayment(formData);
      return navigate(`/payment-success/${formData.orderId}`);
    } else if (
      formData.paymentMethod == "wallet" &&
      user?.wallet?.balance < formData.totalPrice
    ) {
      return ErrorMessage(
        "Insufficient Wallet Balance: Your wallet does not have sufficient funds to complete the transaction"
      );
    } else if (formData.paymentMethod == "card") {
      dispatch(setBookingData(formData));
      const url = await makePayment(formData);

      if (url) {
        window.location.href = url;
        return;
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      <form>
        <h1 className="p-3 text-center text-black text-2xl font-bold">
          Checkout page
        </h1>
        <div className="flex flex-col md:flex-row justify-between md:ml-10 p-4">
          <div className="flex">
            <div className="w-full md:w-40">
              <img
                src={carData ? carData?.images[0] : ""}
                alt="Car"
                className="max-w-full h-auto"
              />
            </div>
            <div className="mt-4 md:mt-0 ml-4">
              <p className="text-2xl font-bold">{carData?.carName}</p>
              <p className="text-lg">{carData?.category?.name}</p>
              <p className="text-lg">{carData?.perDayPrice}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-8 mb-4">
          <div className="p-5 rounded-md bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="mt-4 border border-gray-300 p-4 rounded-md shadow-md md:w-1/2 mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              Choose a Payment Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  name="paymentMethod"
                  checked={formData?.paymentMethod === "card"}
                  onChange={handleChange}
                  className="form-radio text-indigo-600 h-5 w-5"
                />
                <span className="text-gray-900">Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="wallet"
                  name="paymentMethod"
                  checked={formData?.paymentMethod === "wallet"}
                  onChange={handleChange}
                  className="form-radio text-indigo-600 h-5 w-5"
                />
                <span className="text-gray-900">Wallet</span>
              </label>
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
                className="bg-green-600 py-2 px-3 rounded-lg font-bold text-white w-full md:w-auto"
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
