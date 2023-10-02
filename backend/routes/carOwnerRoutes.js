import express from 'express'
import { signup, login } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';
import { addBrand, addCar } from '../controller/carOwner/CarController.js';
const router = express();

router.post('/signup',signup);
router.post('/login',login)
router.post('/add-brand',addBrand)
router.get('/add-car',addCar)
export default router;