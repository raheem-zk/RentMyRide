import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  dropoffDate: {
    type: Date,
    required: true,
  },
  dropoffTime: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  perDayPrice: {
    type: String,
    required: true,
  },
  totalDays: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:'pending' // [ pending, approved, rejected] 
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cars", 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
