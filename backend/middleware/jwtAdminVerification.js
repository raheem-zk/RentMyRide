import jwt from 'jsonwebtoken';


const VerifyToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res
            .status(401)
            .json({message:'Authentication token is missing or invalid.'});
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }

            if(!decoded.role ==='admin'){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        })
    } catch (error) {
        console.log(error);
    }
}

export default VerifyToken;