import express from "express";
import { login, signup, googleSignin, otpVerification, verifySignup } from "../controller/user/AuthController.js";
import { home } from '../controller/user/HomeController.js'; 

const router = express();

router.post('/login',login);
router.post('/signup',signup)
router.post('/signup-verify',verifySignup)
router.post('/otp-verification',otpVerification)
router.post('/google-signin',googleSignin)
router.get('/',home);
export default router;