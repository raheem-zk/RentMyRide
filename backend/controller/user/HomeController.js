import carsSchema from '../../models/carOwner/car.js';
const APPROVEL = 'Approved';

export const home = async (req, res)=>{
    try {
        console.log(req.headers.authorization)
        const carData = await carsSchema.find({status:APPROVEL})
        .populate('fuelType') 
        .populate('transmission');
        return res.json({message:'success', carData});
    } catch (error) {
        console.log(error);
    }
}

