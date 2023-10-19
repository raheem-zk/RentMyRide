import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../utils/utils";
import { CarDetailsModel } from "../../models/models";
import dayjs from "dayjs";

const CarRentalCheckout = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { success, user } = useSelector((state: any) => state.userAuth);
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [carDate, setCarData] = useState<CarDetailsModel | null>(null);

  const [pickupDate, setPickupDate] = useState(dayjs().add(1, 'day').format("YYYY-MM-DD")); // Set initial pickup date to tomorrow
  const [returnDate, setReturnDate] = useState(dayjs().add(2, 'days').format("YYYY-MM-DD")); // Set initial return date to the day after tomorrow
  const [endDate] = useState(carDate?.endDate || dayjs().add(30, "days").format("YYYY-MM-DD"));
  console.log(pickupDate, returnDate);

  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    if (dayjs(selectedDate).isBefore(dayjs().add(1, 'day')) || dayjs(selectedDate).isAfter(endDate)) {
      ErrorMessage("Invalid pickup date. It should be tomorrow or later and before the end date.");
    } else {
      setPickupDate(selectedDate);
    }
  };

  const handleReturnDateChange = (e) => {
    const selectedDate = e.target.value;
    if (dayjs(selectedDate).isBefore(dayjs(pickupDate)) || dayjs(selectedDate).isAfter(endDate)) {
      ErrorMessage("Invalid return date. It should be after the pickup date and before the end date.");
    } else {
      setReturnDate(selectedDate);
    }
  };

  const [formData, setFormData] = useState({
    carId: carId,
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    returnLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    license: "",
    address: "",
    userId: user?._id,
    totalDays: 2,
    totalPrice: 0,
  });

  useEffect(() => {
    const car = cars.find((car) => car._id === carId);
    setCarData(car);
  }, []);
  console.log(carDate);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (
      !formData.pickupDate ||
      !formData.returnDate ||
      !formData.pickupLocation ||
      !formData.returnLocation ||
      !formData.pickupTime ||
      !formData.returnLocation ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.license ||
      !formData.address ||
      !formData.totalDays ||
      !formData.totalPrice
    ) {
      return ErrorMessage("Pickup date is required");
    }

    const pickupDate = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const currentDate = new Date();

    const minReturnDate = new Date(pickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 2); // Minimum return date is 2 days after pickup
    if (returnDate <= minReturnDate) {
      return ErrorMessage("Return date must be at least 2 days after pickup");
    }
  };

  return (
    <div className="w-full mx-auto">
      {carDate && (
        <h1>
          {carDate?.startDate}  hhh  {carDate?.endDate}
        </h1>
      )}
      <form>
        <h1 className="p-3 text-center text-black text-2xl font-bold">
          Checkout page
        </h1>
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
                  min={dayjs().add(1, 'day').format("YYYY-MM-DD")}
                  max={endDate}
                  value={pickupDate}
                  onChange={handlePickupDateChange}
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
                  required
                  type="text"
                  id="returnLocation"
                  name="returnLocation"
                  value={formData?.returnLocation}
                  placeholder="Enter Return Location"
                  onChange={handleChange}
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
                  required
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={returnDate}
                  onChange={handleReturnDateChange}
                  min={pickupDate}
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
                  htmlFor="returnTime"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Return Time
                </label>
                <input
                  required
                  type="time"
                  id="returnTime"
                  name="returnTime"
                  value={formData?.returnTime}
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
                  id="driverLicence"
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
              <p className="text-xl font-bold mb-4">Payment</p>
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
                    ${formData?.totalPrice}
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
