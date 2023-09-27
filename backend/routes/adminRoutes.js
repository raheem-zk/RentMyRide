import express from "express";
import { login } from '../controller/admin/AuthController.js'

const router = express();

router.post('/login',login);

export default router;