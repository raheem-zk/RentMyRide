import ownerSchema from "../../models/carOwner/carOwner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateOTP, transporter } from "../../utils/utils.js";
import { addCar } from "./CarController.js";
let copyOtp;

export const verifySignup = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    console.log(req.body, email, phoneNumber);
    const result = await ownerSchema.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    console.log(result);
    if (result) {
      return res.status(404).json({
        message: "the owner is exsisted check your email or phone number",
        error: true,
      });
    }

    // send mail with defined transport object
    const otp = generateOTP();
    console.log(otp)
    copyOtp = otp;
    var mailOptions = {
      to: email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return res.status(200).json({ message: "success" });
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const verifyOtp = (req, res)=>{
  try {
    const { otp } = req.body;
    if(!otp == copyOtp){
      return res.status(401).json({message: 'OTP is not Valied'});
    }
    return res.json({message:'success'})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password,
      pincode,
      license,
      place,
      address,
    } = req.body.ownerData;
    const result = await ownerSchema.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (result) {
      return res.status(404).json({
        message: "the owner is exsisted check your email or phone number",
        error: true,
      });
    }

    const saltRounds = parseInt(process.env.SALTROUNDS);
    console.log(req.body);
    console.log(typeof saltRounds, password);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    const ownerModel = new ownerSchema({
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password: hashedPassword,
      pincode,
      license,
      place,
      address,
    });
    await ownerModel.save();
    const owner = await ownerSchema.findOne({ email: email });
    console.log(req.body);
    const carDetails = req.body.carDetails;
    console.log(carDetails,'car details');
    carDetails.ownerId = owner._id;
    console.log('-----req.body fi------')

    console.log(typeof carDetails.images);
    console.log('------images-----')
    // console.log(carDetails.images[0]);
    const uploadedImages = req.files.images;

    // Now you can use the uploaded images in your code
    console.log(uploadedImages); // Array of image data
    console.log('-----image------')
    console.log(req?.file)
    console.log('-----image[0]------')

    // addCar(carDetails);
    // return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ownerData = await ownerSchema.findOne({ email });
    if (!ownerData) {
      return res.status(400).json({
        message: "Invalid email address or email not found",
        error: true,
      });
    }
    const isPasswordVerified = bcrypt.compareSync(password, ownerData.password);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }
    const token = jwt.sign(
      { user: email, role: "carOwner" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "success", token, ownerData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

