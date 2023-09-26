import express from "express";
import { login, signup } from "../controller/user/AuthController.js";

const router = express();

router.post('/login',login);
router.post('/signup',signup)

export default router;