import userSchema from "../../models/user.js";
import bcrypt from "bcrypt";

export const updatePassword = async (req, res)=>{
    try {
        const { password, email } = req.body;
        const saltRounds = parseInt(process.env.SALTROUNDS);
    
        if (!password || !email) {
          return res.status(400).json({ message: 'Both email and password are required.' });
        }
    
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await userSchema.updateOne({ email: email }, { $set: { password: hashedPassword } });
    
        if (result.nModified === 0) {
          return res.status(404).json({ message: 'Email not found or password already set to the new value.' });
        }
        
        return res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}