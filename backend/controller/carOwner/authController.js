import ownerSchema from "../../models/carOwner/carOwner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP, transporter } from "../../utils/utils.js";
import { addCar } from "./carController.js";
import carSchema from "../../models/carOwner/car.js";
let copyOtp;

export const verifySignup = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const result = await ownerSchema.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (result) {
      return res.status(404).json({
        message: "the owner is exsisted check your email or phone number",
        error: true,
      });
    }

    // send mail with defined transport object
    const otp = generateOTP();
    console.log(otp);
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp == copyOtp) {
      return res.status(401).json({ message: "OTP is not Valied" });
    }
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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
    const carDetails = req.body.carDetails;
    carDetails.ownerId = owner._id;

    const matched = await carSchema.findOne({
      licensePlate: carDetails.licensePlate,
    });

    if (matched) {
      await ownerSchema.deleteOne({ _id: owner._id });

      return res.status(404).json({
        message: "Car with the provided license plate already exists.",
        error: true,
      });
    }

    const lastResult = await addCar(carDetails);
    if (lastResult) {
      return res.json({ message: "success" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
    if (ownerData.status === false) {
      return res.status(400).json({
        message:
          "Car Owner Account Blocked: Please contact customer support for further assistance",
        error: true,
      });
    }
    const isPasswordVerified = bcrypt.compareSync(password, ownerData.password);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }
    const token = jwt.sign(
      { user: ownerData._id, role: "carOwner" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "success", token, ownerData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyForgot = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await ownerSchema.findOne({ email: email });

    if (!result) {
      return res.status(404).json({ message: "Email is not matched" });
    }
    
    if (result.status === false) {
      return res.status(400).json({
        message:
          "User Account Blocked: Please contact customer support for further assistance",
        error: true,
      });
    }

    const otp = generateOTP();
    console.log(otp);
    copyOtp = otp;

    const mailOptions = {
      to: email,
      subject: "OTP for Forgot password",
      html: `
        <h3>OTP for Forgot password is:</h3>
        <h1 style="font-weight: bold;">${otp}</h1>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(404).json({
          message: "The provided email does not match any registered user.",
        });
      }
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "success" });
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const otpVerification = async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp != copyOtp) {
      return res.status(401).json({ message: "OTP is not Valied" });
    } else if (otp == copyOtp) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS);

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await ownerSchema.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Email not found or password already set to the new value.",
      });
    }

    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};