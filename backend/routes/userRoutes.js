import express from "express";
import {
  login,
  signup,
  googleSignin,
  otpVerification,
  verifySignup,
  verifyForgot,
} from "../controller/user/AuthController.js";
import { filterData, home } from "../controller/user/HomeController.js";
import VerifyToken from "../middleware/jwtUserVerification.js";
import {
  bookingCheckoutSession,
  rentBooking,
} from "../controller/user/BookingController.js";
import {
  forgotPasswordUpdate,
  updatePassword,
  updateProfile,
  updateProfilePhoto,
} from "../controller/user/UserProfileController.js";

const router = express();

router.post("/login", login);
router.post("/signup", signup);
router.post("/signup-verify", verifySignup);
router.post("/otp-verification", otpVerification);
router.post("/google-signin", googleSignin);
router.get("/", home);

router.post("/forgot-password", verifyForgot);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/set-password", forgotPasswordUpdate);

router.post("/rent-booking/confirm", VerifyToken, rentBooking);
router.post("/rent-booking", VerifyToken, bookingCheckoutSession);

router.patch("/profile/:userId/edit", VerifyToken, updateProfile);
router.patch("/profile/:userId/edit-password", VerifyToken, updatePassword);
router.patch("/profile/:userId/edit/profile-photo", VerifyToken, updateProfilePhoto);

router.get('/filter',filterData)
export default router;
