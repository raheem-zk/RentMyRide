import express from "express";
import {
  login,
  signup,
  googleSigning,
  otpVerification,
  verifySignup,
  verifyForgot,
  getUpdatedUserData,
} from "../controller/user/AuthController.js";
import { district, filterData, home } from "../controller/user/HomeController.js";
import VerifyToken from "../middleware/jwtUserVerification.js";
import {
  bookingCheckoutSession,
  rentBooking,
} from "../controller/user/BookingController.js";
import {
  resetPassword,
  updatePassword,
  updateProfile,
  updateProfilePhoto,
} from "../controller/user/UserProfileController.js";
import { getUserOrderMoredetailsData, getUserOrders, orderCancel } from "../controller/user/OrderController.js";

const router = express();

router.post("/login", login);
router.post("/signup", signup);
router.post("/signup-verify", verifySignup);
router.post("/otp-verification", otpVerification);
router.post("/google-signing", googleSigning);
router.get("/", home);

router.get('/getupdatedData/:userId',VerifyToken, getUpdatedUserData)

router.get('/filter',filterData)
router.get('/district',district)

router.post("/forgot-password", verifyForgot);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/reset-password", resetPassword);

router.post("/rent-booking/confirm", VerifyToken, rentBooking);
router.post("/rent-booking", VerifyToken, bookingCheckoutSession);

router.patch("/profile/:userId/edit", VerifyToken, updateProfile);
router.patch("/profile/:userId/edit-password", VerifyToken, updatePassword);
router.patch("/profile/:userId/edit/profile-photo", VerifyToken, updateProfilePhoto);

router.get('/orders/:userId/:page',VerifyToken, getUserOrders)
router.get('/orders/:orderId',VerifyToken, getUserOrderMoredetailsData)
router.post('/orders/cancel', VerifyToken, orderCancel);

export default router;
