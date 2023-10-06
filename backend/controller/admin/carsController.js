import carSchema from "../../models/carOwner/car.js";

export const carList = async (req, res)=>{
    try {
        console.log('cars list')
        const data = await carSchema.find() ?? [];
        console.log(data)
        return res.json({message:'success',carsData: data})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: true });
    }
}