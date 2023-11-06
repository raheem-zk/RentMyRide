import orderSchema from "../../models/order.js";

const LIMIT = 3;

export const getUserOrders = async (req, res) => {
  try {
    const { userId, page } = req.params;
    
    const TotalSize = await orderSchema.countDocuments({
      userId: userId,
      paymentStatus: "Paid",
    });

    const size = Math.ceil(TotalSize / LIMIT);
    const SKIP = (page - 1) * LIMIT;

    let query = { userId: userId, paymentStatus: "Paid" };
    if (req.query.filterValue) {
      query.status = req.query.filterValue;
    }
    const ordersData = await orderSchema
      .find(query)
      .populate("carId")
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);

    return res.json({ message: "success", ordersData, size });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserOrderMoredetailsData = async (req, res) => {
  try {
    const { orderId } = req.params;
    const data = await orderSchema
      .findOne({ orderId: orderId })
      .populate("carId")
      .populate("userId");

    console.log(data);

    if (!data) {
      return res.status(404).json({ message: "Order data not fouded!" });
    }
    return res.json({ message: "success", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
