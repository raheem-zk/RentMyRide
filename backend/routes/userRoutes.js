import express from "express";
import { login, signup, googleSignin, otpVerification, verifySignup, verifyForgot } from "../controller/user/AuthController.js";
import { home } from '../controller/user/HomeController.js'; 
import VerifyToken from '../middleware/jwtUserVerification.js';
import { bookingCheckoutSession, rentBooking } from "../controller/user/BookingController.js";
import { updatePassword } from "../controller/user/UserProfileController.js";

const router = express();

router.post('/login',login);
router.post('/signup',signup)
router.post('/signup-verify',verifySignup)
router.post('/otp-verification',otpVerification)
router.post('/google-signin',googleSignin)
router.get('/',home);

router.post('/forgot-password',verifyForgot)
router.post('/forgot-password/otp',otpVerification)
router.post('/forgot-password/set-password',updatePassword)

router.post('/rent-booking/confirm',VerifyToken, rentBooking)
router.post('/rent-booking',bookingCheckoutSession);
export default router;