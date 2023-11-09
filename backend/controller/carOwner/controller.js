import orderShema from "../../models/order.js";
import carShema from "../../models/carOwner/car.js";

export const dashboard = async (req, res) => {
  try {
    const { ownerId } = req.params;
    let statusData = {};
    const orderData = await orderShema.find({ ownerId, status: "finished" });

    if (orderData.length === 0) {
      statusData.totalRevenue = 0;
    } else {
      const total = orderData.reduce((sum, order) => {
        return sum + (order?.totalPrice || 0);
      }, 0);
      statusData.totalRevenue = total;
    }
    statusData.totalUser = await orderShema
      .distinct("userId")
      .countDocuments({ ownerId });
    statusData.totalCar = await carShema.countDocuments({ ownerId });
    statusData.newOrder = await orderShema.countDocuments({
      ownerId,
      status: "pending",
      paymentStatus: "Paid",
    });
    return res.json({ message: "success", statusData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
