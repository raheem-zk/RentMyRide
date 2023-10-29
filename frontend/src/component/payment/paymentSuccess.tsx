import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booking, updatedUserData } from "../../api/userApi";
import { clearBooking } from "../../redux/user/bookingSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading";
import { updateData } from "../../redux/user/authSlice";

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
      setLoading(false)
      if(bookingData?.paymentMethod=='wallet'){
        const updatedData = await updatedUserData(bookingData?.userId);
        dispatch(updateData(updatedData));
      }
    }
  };
  
  
useEffect(()=>{
  if(!orderId || !bookingData){
    navigate('/');
    return 
  }

  if(bookingData && bookingData?.orderId !== orderId){
    navigate('/');
    return
  }
  if(bookingData?.orderId === orderId){
    uploadBooking()
  }
},[])

  return loading ? <Loading/> : (
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
