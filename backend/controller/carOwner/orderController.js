import ordersSchema from "../../models/order.js";
import carSchema from "../../models/carOwner/car.js";
const APPROVE = "approved";
const REJECT = "rejected";
export const orders = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const cars = await carSchema.find({ ownerId });
    const ordersData = await ordersSchema.find({
      carId: { $in: cars.map((car) => car._id) },
    });
    return res.json({ message: "success", ordersData });
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
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
