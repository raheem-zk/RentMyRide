import orderShema from '../../models/order.js';

const LIMIT = 10;

export const getOrders = async (req, res) => {
  try {
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;

    const SKIP = (PAGE - 1) * LIMIT;

    const data = await orderShema.find().populate('carId').populate('userId')
    .sort({_id:-1})
    .skip(SKIP)
    .limit(LIMIT) ?? [];

    const TotalSize = await orderShema.countDocuments();
    const size = Math.ceil(TotalSize / LIMIT);
    
    return res.json({message:'success', ordersData: data, size})
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
