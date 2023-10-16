import express from "express";
import { login, signup, googleSignin, otpVerification, verifySignup } from "../controller/user/AuthController.js";
import { home } from '../controller/user/HomeController.js'; 
import VerifyToken from '../middleware/jwtUserVerification.js';
import { rentBooking } from "../controller/user/bookingController.js";

const router = express();

router.post('/login',login);
router.post('/signup',signup)
router.post('/signup-verify',verifySignup)
router.post('/otp-verification',otpVerification)
router.post('/google-signin',googleSignin)
router.get('/',home);

router.post('/rent-booking', rentBooking)

export default router;