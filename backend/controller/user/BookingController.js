import OrderShema from '../../models/order.js'; 

export const rentBooking = async (req, res) => {
    try {
        const data = req.body;
        const orderModel = new OrderShema(data); 
        await orderModel.save(); 
        return res.json({ message: "success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: true });
    }
}
