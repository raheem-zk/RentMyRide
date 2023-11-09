import express from 'express'
import { signup, login, verifySignup, verifyOtp } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCategory, addDistrict, addFuelType, addModel, addTransmission, getCarModels } from '../controller/carOwner/carSpecController.js';
import { cars, editCar, uploadCar } from '../controller/carOwner/carController.js';
import { approveOrder, orders, rejectOrder } from '../controller/carOwner/orderController.js';

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

router.post('/add-car',VerifyToken,uploadCar);
router.get('/cars/:ownerId',VerifyToken,cars);
router.post('/edit-car/:carId',VerifyToken,editCar)

router.get('/orders/:ownerId/:page',VerifyToken, orders)
router.patch('/order/approve/:orderId', approveOrder)
router.patch('/order/reject/:orderId', rejectOrder)

export default router;