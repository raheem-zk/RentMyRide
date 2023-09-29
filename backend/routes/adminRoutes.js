import express from "express";
import { login } from '../controller/admin/AuthController.js'
import { userList } from '../controller/admin/UserList.js';

const router = express();

router.post('/login',login);
router.get('/users',userList)

export default router;