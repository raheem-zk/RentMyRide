import orderShema from "../../models/order.js";
import userShema from "../../models/user.js";
import carOwnerShema from "../../models/carOwner/carOwner.js";
import carShema from "../../models/carOwner/car.js";

const LIMIT = 5;

export const getOrders = async (req, res) => {
  try {
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;

    const SKIP = (PAGE - 1) * LIMIT;

    const data =
      (await orderShema
        .find()
        .populate("carId")
        .populate("userId")
        .sort({ _id: -1 })
        .skip(SKIP)
        .limit(LIMIT)) ?? [];

    const TotalSize = await orderShema.countDocuments();
    const size = Math.ceil(TotalSize / LIMIT);

    return res.json({ message: "success", ordersData: data, size });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const dashboard = async (req, res) => {
  try {
    let statusData = {};
    const orderData = await orderShema.find({ status: "finished" });

    if (orderData.length === 0) {
      statusData.totalRevenue = 0;
    } else {
      const total = orderData.reduce((sum, order) => {
        return sum + (order?.totalPrice || 0);
      }, 0);
      statusData.totalRevenue = total;
    }

    statusData.totalUser = await userShema.countDocuments();
    statusData.totalCarOwner = await carOwnerShema.countDocuments();
    statusData.totalCar = await carShema.countDocuments();

    const blockedUser = await userShema.countDocuments({status: false});
    const blockedCarOwnerData = await carOwnerShema.countDocuments({status: false});
    const newOrders = await orderShema.countDocuments({paymentStatus: 'Paid',status: 'pending' })
    const totalOrders = await orderShema.countDocuments({paymentStatus: 'Paid'})
    
    const barData ={
      user : statusData.totalUser,
      blockedUser,
      carOwnerData: statusData.totalCarOwner,
      blockedCarOwnerData ,
      newOrders,
      totalOrders,
    }
    return res.json({ message: "success", statusData, barData});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
