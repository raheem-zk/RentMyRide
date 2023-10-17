import express from 'express'
import { signup, login, verifySignup, verifyOtp } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCar, addCategory, addFuelType, addModel, addTransmission } from '../controller/carOwner/carSpecController.js';
import { cars, uploadCar } from '../controller/carOwner/carController.js';
import { orders } from '../controller/carOwner/orderController.js';


const router = express();

router.post('/add-brand',addBrand)
router.post('/add-category',addCategory)
router.post('/add-model',addModel)
router.post('/add-fueltype',addFuelType)
router.post('/add-transmission',addTransmission)
router.get('/add-car',addCar);

router.post('/signup-verify', verifySignup);
router.post('/otp-verification',verifyOtp)
router.post('/signup',signup);
router.post('/login',login)

router.post('/add-car',VerifyToken,uploadCar);
router.get('/cars/:ownerId',VerifyToken,cars);
router.get('/orders/:ownerId',VerifyToken, orders)

export default router;