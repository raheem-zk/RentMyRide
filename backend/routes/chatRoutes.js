import express from "express";
import { createChat, findChat, userChats } from "../controller/chat/chatController.js";

const router = express();

router.post('/',createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)

export default router;