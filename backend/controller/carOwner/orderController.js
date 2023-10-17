import ordersSchema from '../../models/order.js';
import carSchema from '../../models/carOwner/car.js';

export const orders = async(req, res)=>{
    try {
        const { ownerId } = req.params;
        const cars = await carSchema.find({ownerId})
        const ordersData = await ordersSchema.find({ carId: { $in: cars.map(car => car._id) } })
        console.log(ordersData, 'ordersData');
        return res.json({message:'success', ordersData});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}