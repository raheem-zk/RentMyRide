import carsSchema from '../../models/carOwner/car.js';
const APPROVEL = 'Approved';

export const home = async (req, res)=>{
    try {
        console.log(req.headers.authorization)
        const carsData = await carsSchema.find({status:APPROVEL})
        .populate('fuelType') 
        .populate('transmission')
        .populate('brand')
        .populate('model')
        .populate('category')
        return res.json({message:'success', carsData});
    } catch (error) {
        console.log(error);
    }
}

