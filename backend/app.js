import "dotenv/config";
import express from 'express';
import dbConnect from './config/config.js';

const app = express();
dbConnect();


const PORT = process.env.PORT ?? 4000;
app.listen(PORT ,()=>{
    console.log(`Example app listening on port ${PORT}`);
})
