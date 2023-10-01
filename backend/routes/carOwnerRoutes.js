import express from 'express'
import { signup, login } from '../controller/carOwner/AuthController.js';
import VerifyToken from '../middleware/jwtCarOwnerVerification.js';

const router = express();

router.post('/signup',signup);
router.post('/login',login)
