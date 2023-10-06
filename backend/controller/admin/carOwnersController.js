import carOwnerSchema from '../../models/carOwner/carOwner.js';
 
export const carOwnersList = async (req, res)=>{
    try {
        const carownersData = await carOwnerSchema.find() ?? [];
        res.json({message:'success',carownersData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}