import "dotenv/config";
import express, { json } from 'express';
import dbConnect from './config/config.js';
import router from "./routes/userRoutes.js";
import cors from 'cors'
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_URL = process.env.CLIENT_URL

app.use(cors({
    origin: CLIENT_URL,
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}))
app.use('/',router)

const PORT = process.env.PORT ?? 4000;
app.listen(PORT ,()=>{
    console.log(`Example app listening on port ${PORT}`);
})
