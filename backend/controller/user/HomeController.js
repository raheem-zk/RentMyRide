

export const home = async (req, res)=>{
    try {
        console.log(req.headers.authorization)
        res.json({message:'success'});
    } catch (error) {
        console.log(error);
    }
}

