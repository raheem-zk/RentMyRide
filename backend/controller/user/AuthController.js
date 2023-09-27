import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
