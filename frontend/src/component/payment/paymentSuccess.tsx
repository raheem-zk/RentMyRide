import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booking } from "../../api/userApi";
import { clearBooking } from "../../redux/user/bookingSlice";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const { bookingData } = useSelector((state: any) => state.bookingData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uploadBooking = async () => {
    const response = await booking(bookingData);
    if (response) {
      dispatch(clearBooking());
    }
  };

  useEffect(() => {
    if (orderId != bookingData?.orderId) {
      navigate("/");
    }
    if (bookingData) {
      console.log("Booking data here:", bookingData);
      uploadBooking();
    }
  }, [bookingData]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
        <p>
          Your booking has been confirmed. Thank you for choosing our service!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
