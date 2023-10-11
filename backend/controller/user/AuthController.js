import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { generateOTP, transporter } from "../../utils/utils.js";
let copyOtp;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email });
    if (!userData) {
      return res
        .status(400)
        .json({
          message: "Invalid email address or email not found",
          error: true,
        });
    }

    const isPasswordVerified = bcrypt.compareSync(password, userData.password);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }
    const token = jwt.sign({ user:email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({ message: "success" , token, userData});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, age, phoneNumber, email, password } = req.body;
    const alreadyExistUser = await userModel.findOne({
      $or: [{email}, {phoneNumber}],
    });
    if (alreadyExistUser) {
      return res.json({
        message: "Added user existence check by email and phone number",
        error:true
      });
    }

    const saltRounds = parseInt(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userSchema = new userModel({
      firstName,
      lastName,
      age,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await userSchema.save();
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

export const verifySignup = async (req, res)=>{
  try {
    const { email, phoneNumber } = req.body;
    const result = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    })
    if (result) {
      return res.status(404).json({
        message: "the user is exsisted check your email or phone number",
        error: true,
      });
    }
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
      return res.status(200).json({ message: "success" });
    });
    return res.status(200).json({ message: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const otpVerification = async (req, res)=>{
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


export const googleSignin = async (req, res)=>{
  try {
    const { email, family_name, given_name}= req.body;
    const result = await userModel.findOne({email: email})
    if(result){
      const token = jwt.sign({ user:email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })
      return res.json({message:'success', token, userData:result});
    }

    console.log('no user')
    const userSchema = new userModel({
      email,
      firstName: given_name,
      lastName: family_name
    })
    await userSchema.save();
    const userData = await userModel.findOne({ email });
    const token = jwt.sign({ user:email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return res.json({message:'success', token, userData});
  } catch (error) {
    console.log(error);
  }
}