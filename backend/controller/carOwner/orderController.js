import ordersSchema from "../../models/order.js";
import carSchema from "../../models/carOwner/car.js";
import walletSchema from "../../models/wallet.js";

const APPROVE = "approved";
const REJECT = "rejected";
const LIMIT = 3;
const PAID = "Paid";

export const orders = async (req, res) => {
  try {
    const { ownerId, page } = req.params;

    const cars = await carSchema.find({ ownerId });
    const carIds = cars.map((car) => car._id);

    const TotalSize = await carSchema.countDocuments({
      ownerId,
      paymentStatus: PAID,
    });

    const size = Math.ceil(TotalSize / LIMIT);
    const SKIP = (page - 1) * LIMIT;

    const ordersData = await ordersSchema
      .find({
        carId: { $in: carIds },
        paymentStatus: PAID,
      })
      .populate("carId")
      .populate("userId")
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);

    return res.json({ message: "success", ordersData, size });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await ordersSchema.updateOne(
      {
        _id: orderId,
      },
      {
        $set: {
          status: APPROVE,
        },
      }
    );
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await ordersSchema.updateOne(
      {
        _id: orderId,
      },
      {
        $set: {
          status: REJECT,
        },
      }
    );

    const orderData = await ordersSchema.findOne({ _id: orderId });

    const walletData = {
      amount: orderData.totalPrice,
      type: "credit",
      description: "Rejected car rental refund",
    };

    const result = await walletSchema.updateOne(
      { userId: orderData.userId },
      {
        $inc: { balance: orderData.totalPrice },
        $push: { history: walletData },
      }
    );
    
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
