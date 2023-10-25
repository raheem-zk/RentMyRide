import orderShema from '../../models/order.js';

export const getOrders = async (req, res) => {
  try {
    const data = await orderShema.find().populate('carId').populate('userId').sort({_id:-1}) ?? [];
    return res.json({message:'success', ordersData: data})
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
