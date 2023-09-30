import express from "express";
import { login, signup, googleSignin } from "../controller/user/AuthController.js";
import { home } from '../controller/user/HomeController.js'; 
import VerifyToken from "../middleware/jwtUserVerification.js";

const router = express();

router.post('/login',login);
router.post('/signup',signup)
router.post('/google-signin',googleSignin)
router.get('/',VerifyToken,home);
export default router;