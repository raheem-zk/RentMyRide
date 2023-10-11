import express from "express";
import { login } from '../controller/admin/AuthController.js'
import { userList , userBlock, userUnblock } from '../controller/admin/UsersController.js';
import VerifyToken from "../middleware/jwtAdminVerification.js";
import { carApproved, carList, carRejected } from "../controller/admin/carsController.js";
import { carOwnersList } from "../controller/admin/carOwnersController.js";

const router = express();

router.post('/login',login);
// users
router.get('/users',VerifyToken,userList)
router.patch('/users/:id/unblock',VerifyToken,userUnblock)
router.patch('/users/:id/block',VerifyToken,userBlock)

// cars
router.get('/cars',VerifyToken,carList)
router.patch('/cars/:id/approve/',VerifyToken,carApproved)
router.patch('/cars/:id/reject/:message',VerifyToken,carRejected)

// car owners
router.get('/car-owners',VerifyToken,carOwnersList)
export default router;