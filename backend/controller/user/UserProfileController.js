import userSchema from "../../models/user.js";
import bcrypt from "bcrypt";

export const forgotPasswordUpdate = async (req, res) => {
  try {
    const { password, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS);

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userSchema.updateOne(
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

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    await userSchema.updateOne({ _id: userId }, data);

    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordVerified = bcrypt.compareSync(
      currentPassword,
      user.password
    );
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const saltRounds = parseInt(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await userSchema.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );

    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
