import "dotenv/config";
import express from 'express';
import dbConnect from './config/config.js';
import userRouter from "./routes/userRoutes.js";
import adminRouter from './routes/adminRoutes.js';
import carownerRouter from './routes/carOwnerRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import configureSocket from "./config/socket.js";
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_URL = process.env.CLIENT_URL
const corsOptions = {
    origin: CLIENT_URL,
    methods:'GET,POST,PUT,DELETE,PATCH',
    credentials:true
}
app.use(cors(corsOptions))

const server = http.createServer(app);
const io = new Server(server, {
  cors:CLIENT_URL,
});
  
configureSocket(io)

app.use(express.static('public'))

app.use('/', userRouter)
app.use('/admin', adminRouter);
app.use('/car-owner', carownerRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter)

const PORT = process.env.PORT ?? 4000;
server.listen(PORT ,()=>{
    console.log(`Example app listening on port ${PORT}`);
})
