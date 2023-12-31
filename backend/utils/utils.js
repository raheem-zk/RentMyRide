import nodemailer from "nodemailer";
import orderSchema from "../models/order.js";
import carSchema from "../models/carOwner/car.js";
import cron from "node-cron";
import { updateOrderRejectionStatus } from "../controller/carOwner/orderController.js";

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

const rentCarRented = async (carId, orderId) => {
  const car = await carSchema.findOne({ _id: carId });
  const order = await orderSchema.findOne({ orderId });
  if (order?.status == "approved") {
    orderSchema.updateOne({ orderId }, { $set: { status: "Rented" } });
  }
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
  const data = await orderSchema.find({
    status: "approved",
    paymentStatus: "Paid",
  });
  const currentDate = new Date();
  data.forEach(async (order) => {
    const startDate = new Date(order.pickupDate);
    const endDate = new Date(order.dropoffDate);
    if (
      startDate.toISOString().split("T")[0] ===
      currentDate.toISOString().split("T")[0]
    ) {
      await rentCarRented(order?.carId, order?.orderId);
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

export const checkAndRejectUnapprovedOrders = async () => {
  const data = await orderSchema.find({
    status: "pending",
    paymentStatus: "Paid",
  });

  const currentDate = new Date();
  data.forEach(async (order) => {
    const startDate = new Date(order.pickupDate);
    if (
      startDate.toISOString().split("T")[0] <
      currentDate.toISOString().split("T")[0]
    ) {
      await updateOrderRejectionStatus(order?.carId);
    }
  });
};

const deleteUnpaidOrders = async () => {
  const data = await orderSchema.deleteMany({ paymentStatus: "Pending" });
};

cron.schedule("0 0/12 * * *", async () => {
  await orderVerification();
  await carAvailabilityVerification();
  await checkAndRejectUnapprovedOrders();
  await deleteUnpaidOrders();
});

export const orderDateValidation = (orderData, pickupDate, dropoffDate) => {
  let isConflict = orderData.map((order) => {
    const orderPickupDate = new Date(order.pickupDate);
    const orderDropoffDate = new Date(order.dropoffDate);

    if (orderPickupDate < pickupDate && orderDropoffDate < pickupDate) {
      return false;
    } else if (pickupDate < orderPickupDate && dropoffDate < orderPickupDate) {
      return false;
    }
    return true;
  });
  return isConflict.some((value) => value === true);
};

export const filterSloatValidation = (start, end, orderData, car) => {
  const order = orderData.find((order) => {
    if (order.carId.equals(car._id)) {
      return car;
    }
  });
  if (order) {
    const pickupDate = new Date(order.pickupDate);
    const dropoffDate = new Date(order.dropoffDate);

    if (start < pickupDate && end < pickupDate) {
      return false;
    } else if (pickupDate < start && dropoffDate < start) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};

export const updateCarResourceStatus = async (role, id, status) => {
  let resource = {};
  resource[role] = id;
  let updateResource = {};
  updateResource[`resourceStatuses.${role}`] = status;
  await carSchema.updateMany(resource, { $set: updateResource });
}
