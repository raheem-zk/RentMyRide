import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booking, updatedUserData } from "../../api/userApi";
import { clearBooking } from "../../redux/user/bookingSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading";
import { updateData } from "../../redux/user/authSlice";
import { AiOutlineHome } from "react-icons/ai";
const PaymentSuccess = () => {
  const { orderId } = useParams();
  const { bookingData } = useSelector((state: any) => state.bookingData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const uploadBooking = async () => {
    const response = await booking(bookingData);
    if (response) {
      dispatch(clearBooking());
      setLoading(false);
      if (bookingData?.paymentMethod == "wallet") {
        const updatedData = await updatedUserData(bookingData?.userId);
        dispatch(updateData(updatedData));
      }
    }
  };

  useEffect(() => {
    if (!orderId || !bookingData) {
      navigate("/");
      return;
    }

    if (bookingData && bookingData?.orderId !== orderId) {
      navigate("/");
      return;
    }
    if (bookingData?.orderId === orderId) {
      uploadBooking();
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="container mx-auto bg-gray-100 p-4">
        <h2 className="text-4xl font-bold mb-5 text-green-500 text-center">
          Thank you. Your order has been received.
        </h2>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img
                src="https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg"
                alt="Car"
                className="h-auto"
              />
            </div>
            <div className="flex-col justify-center my-5">
              <p className="text-lg mb-2">
                Car Order ID:{" "}
                <span className="font-semibold">{bookingData?.orderId}</span>
              </p>
              <p className="text-lg mb-2">
                Total Amount:{" "}
                <span className="font-semibold text-green-500">
                  ₹{bookingData?.totalPrice}
                </span>
              </p>
              <p className="text-lg mb-4">
                Total Days:{" "}
                <span className="font-semibold">
                  {bookingData?.totalDays} days
                </span>
              </p>
              <p className="text-lg mb-4">
                Payment Method:{" "}
                <span className="font-semibold">
                  {bookingData?.paymentMethod}
                </span>
              </p>
            </div>
            <div className="flex-col justify-center my-5">
              <p>Pickup Location: {bookingData?.pickupLocation}</p>
              <p>Pickup Date: {bookingData?.pickupDate}</p>
              <p>Dropoff Location: {bookingData?.dropoffLocation}</p>
              <p>Dropoff Date: {bookingData?.dropoffDate}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/" className="text-blue-700 flex items-center">
              Back to Home <AiOutlineHome size={25} className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Per Day Price</th>
                  <th className="px-4 py-2 border-b">Total Days</th>
                  <th className="px-4 py-2 border-b">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="px-4 py-2 border-b">{bookingData?.email}</td>
                  <td className="px-4 py-2 border-b">
                    ₹{bookingData?.perDayPrice}.00
                  </td>
                  <td className="px-4 py-2 border-b">
                    {bookingData?.totalDays} day
                  </td>
                  <td className="px-4 py-2 border-b text-green-700">
                    ₹{bookingData?.totalPrice}.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
