import express from "express";
import { login } from '../controller/admin/AuthController.js'
import { userList , userBlock, userUnblock } from '../controller/admin/UserList.js';
import VerifyToken from "../middleware/jwtAdminVerification.js";

const router = express();

router.post('/login',login);
router.get('/users',VerifyToken,userList)
router.patch('/users/:id/unblock',VerifyToken,userUnblock)
router.patch('/users/:id/block',VerifyToken,userBlock)

export default router;