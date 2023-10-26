import nodemailer from "nodemailer";
import orderSchema from "../models/order.js";
import carSchema from "../models/carOwner/car.js";
import cron from "node-cron";

const AVAILABLE = "Available";
const UNAVAILABLE = "Unavailable";
const APPROVED = "Approved";

export const generateOTP = () => {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }
  return otp;
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const rentCarRented = async (carId) => {
  const car = await carSchema.findOne({ _id: carId });

  if (car.availability === AVAILABLE) {
    await carSchema.updateOne(
      { _id: carId },
      { $set: { availability: "Rented" } }
    );
  }
};

const rentCarAvailable = async (carId, endDate, orderId) => {
  const currentDate = new Date();

  if (
    endDate.toISOString().split("T")[0] ===
    currentDate.toISOString().split("T")[0]
  ) {
    await carSchema.updateOne(
      { _id: carId },
      { $set: { availability: AVAILABLE } }
    );
  } else {
    await carSchema.updateOne(
      { _id: carId },
      { $set: { availability: UNAVAILABLE } }
    );
  }
  await orderSchema.updateOne(
    { orderId: orderId },
    { $set: { status: "finished" } }
  );
};

export const orderVerification = async () => {
  const data = await orderSchema.find({ status: "approved" });
  const currentDate = new Date();
  data.forEach(async (order) => {
    const startDate = new Date(order.pickupDate);
    const endDate = new Date(order.dropoffDate);
    if (
      startDate.toISOString().split("T")[0] ===
      currentDate.toISOString().split("T")[0]
    ) {
      await rentCarRented(order?.carId);
    }
    if (endDate <= currentDate) {
      await rentCarAvailable(order.carId, endDate, data.orderId);
    }
  });
};

const carAvailabilityVerification = async () => {
  const cars = await carSchema.find({
    status: APPROVED,
    availability: AVAILABLE,
  });
  const currentDate = new Date();

  cars.forEach(async (car) => {
    const endDate = new Date(car?.endDate);
    if (
      currentDate.toISOString().split("T")[0] >=
      endDate.toISOString().split("T")[0]
    ) {
      await carSchema.updateOne(
        { _id: car?._id },
        { $set: { availability: UNAVAILABLE } }
      );
    }
  });
};

cron.schedule("0 0 * * *", async () => {
  await orderVerification();
  await carAvailabilityVerification();
});
