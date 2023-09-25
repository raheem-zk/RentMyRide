

export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        res.json({message: 'success'});
    } catch (error) {
        res.json({message:'error'});
    }
}

export const signup = (req, res)=>{
    try {
        const {firstName,lastName,age,phoneNumber,email,password} = req.body;
        
        return res.json({message:'success'});
    } catch (error) {
        res.json({message:'error'});
    }
}