import nodemailer from 'nodemailer';

export const generateOTP = ()=> {
    const characters = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }
    console.log(process.env.NODEMAILER_EMAIL, process.env.NODEMAILER_PASS)
    return otp;
  }

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
 });