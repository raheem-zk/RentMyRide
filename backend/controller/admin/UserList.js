import userModel from '../../models/user.js';

export const userList = async (req,res)=>{
    try {
        const userData = await userModel.find();
        console.log(userData);
        res.json({userData})
    } catch (error) {
        console.log(error);
    }
}
