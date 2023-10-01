import ownerSchema from "../../models/carOwner/carOwner.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
    } = req.body;
    const result = await ownerSchema.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if(result){
      return res.status(404).json({message:'the owner is exsisted check your email or phone number', error:true})
    }
    
    const saltRounds = parseInt(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const ownerModel = new ownerSchema({
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password : hashedPassword, 
      pincode,
      license,
      place,
      address,
    })
    await ownerModel.save();
    return res.json({message:'success'});

  } catch (error) {
    console.log(error);
  }
};


export const login = async (req,res)=>{
  try {
    const { email , password } = req.body;
    const ownerData = await ownerSchema.findOne({email});
    if(!ownerData){
      return res
        .status(400)
        .json({
          message: "Invalid email address or email not found",
          error: true,
        });
    }
    const isPasswordVerified = bcrypt.compareSync(password, ownerData.password);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }
    const token = jwt.sign({ user:email, role: 'carOwner' }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({ message: "success" , token, ownerData});
  
  } catch (error) {
    console.log(error);
  }
}