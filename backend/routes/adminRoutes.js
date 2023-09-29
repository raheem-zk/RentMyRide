import express from "express";
import { login } from '../controller/admin/AuthController.js'
import { userList , userBlock, userUnblock } from '../controller/admin/UserList.js';

const router = express();

router.post('/login',login);
router.get('/users',userList)
router.patch('/users/:id/unblock',userUnblock)
router.patch('/users/:id/block',userBlock)

export default router;