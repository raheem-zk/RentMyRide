import express from 'express'
import { signup, login, verifySignup, verifyOtp } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCar, addCategory, addFuelType, addModel, addTransmission } from '../controller/carOwner/carSpecController.js';
import upload from '../middleware/multer.js';
import cloudinary from '../utils/cloudinary.js';

// import cloudinary from '../utils/cloudinary.js';
const router = express();

router.post('/login',login)
router.post('/add-brand',addBrand)
router.post('/add-category',addCategory)
router.post('/add-model',addModel)
router.post('/add-fueltype',addFuelType)
router.post('/add-transmission',addTransmission)

router.post('/signup-verify', verifySignup);
router.post('/otp-verification',verifyOtp)
router.post('/signup',signup);
router.get('/add-car',addCar);

export default router;