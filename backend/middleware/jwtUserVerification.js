import jwt from 'jsonwebtoken';
import userSchema from '../models/user.js';

const VerifyToken = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res
            .status(401)
            .json({message:'Authentication token is missing or invalid.'});
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET,async (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }

            if(!decoded.role ==='user'){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const userData = await userSchema.findOne({_id:decoded.user, status: true} );
            if(!userData){
                return res.status(401).json({ message: 'Access Denied: Your account has been temporarily blocked' });
            }
            next();
        })
    } catch (error) {
        console.log(error);
    }
}

export default VerifyToken;