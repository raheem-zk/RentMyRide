import express from "express";
import { login } from '../controller/admin/AuthController.js'
import { userList , userBlock, userUnblock } from '../controller/admin/UsersController.js';
import VerifyToken from "../middleware/jwtAdminVerification.js";
import { carList } from "../controller/admin/carsController.js";

const router = express();

router.post('/login',login);
router.get('/users',VerifyToken,userList)
router.patch('/users/:id/unblock',VerifyToken,userUnblock)
router.patch('/users/:id/block',VerifyToken,userBlock)

router.get('/cars',carList)
export default router;