import userModel from "../../models/user.js";
import bcrypt from "bcrypt";

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

    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
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
      });
    }
    const saltRounds = parseInt(process.env.SALTROUNDS);
    console.log( typeof saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userSchema = new userModel({
      firstName,
      lastName,
      age,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    console.log(hashedPassword, saltRounds);
    await userSchema.save();
    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
