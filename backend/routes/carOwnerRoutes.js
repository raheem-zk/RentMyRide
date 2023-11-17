import express from 'express'
import { signup, login, verifySignup, verifyOtp, verifyForgot, otpVerification, resetPassword } from '../controller/carOwner/authController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCategory, addDistrict, addFuelType, addModel, addTransmission, getCarModels } from '../controller/carOwner/carSpecController.js';
import { cars, editCar, updateAvailability, uploadCar } from '../controller/carOwner/carController.js';
import { approveOrder, orders, rejectOrder } from '../controller/carOwner/orderController.js';
import { dashboard } from '../controller/carOwner/controller.js';

const router = express();

router.post('/add-brand',addBrand)
router.post('/add-category',addCategory)
router.post('/add-model',addModel)
router.post('/add-fueltype',addFuelType)
router.post('/add-transmission',addTransmission)
router.post('/add-district',addDistrict)
router.get('/get-car-models-and-details',getCarModels);

router.post('/signup-verify', verifySignup);
router.post('/otp-verification',verifyOtp)
router.post('/signup',signup);
router.post('/login',login)

router.post("/forgot-password", verifyForgot);
router.post("/forgot-password/otp", otpVerification);
router.post("/forgot-password/reset-password", resetPassword);

router.get('/dashboard/:ownerId',VerifyToken,dashboard);

router.post('/add-car',VerifyToken,uploadCar);
router.get('/cars/:ownerId',VerifyToken,cars);
router.post('/edit-car/:carId',VerifyToken,editCar)
router.patch('/updateAvailability',VerifyToken,updateAvailability)

router.get('/orders/:ownerId/:page',VerifyToken, orders)
router.patch('/order/approve/:orderId', approveOrder)
router.patch('/order/reject/:orderId', rejectOrder)

export default router;