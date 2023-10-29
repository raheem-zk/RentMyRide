import jwt from 'jsonwebtoken';
import carOwnerSchema from '../models/carOwner/carOwner.js';

const VerifyToken = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res
            .status(401)
            .json({message:'Unauthorized'});
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }

            if(!decoded.role ==='carOwner'){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const carOwnerData = await carOwnerSchema.findOnde({_id:decoded.user , status:true})
            if(!carOwnerData){
                return res.status(401).json({ message: 'Access Denied: Your account has been temporarily blocked' });
            }
            next();
        })
    } catch (error) {
        console.log(error);
    }
}

export default VerifyToken;