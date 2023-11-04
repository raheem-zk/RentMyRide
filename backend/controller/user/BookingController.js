import orderShema from "../../models/order.js";
import userSchema from "../../models/user.js";
import walletSchema from "../../models/wallet.js";
import Stripe from "stripe";
import { orderDateValidation } from "../../utils/utils.js";
export const stripe = new Stripe(process.env.STRIP_PRIVET_KEY);

export const rentBooking = async (req, res) => {
  try {
    const data = req.body;
    await userSchema.updateOne(
      { _id: data?.userId },
      {
        $set: {
          license: data.license,
          address: data.address,
        },
      }
    );

    await orderShema.updateOne(
      { orderId: data?.orderId },
      { $set: { paymentMethod: data.paymentMethod, paymentStatus: "Paid" } }
    );

    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

export const bookingCheckoutSession = async (req, res) => {
  try {
    const data = req.body;
    const pickupDate = new Date(data.pickupDate);
    const dropoffDate = new Date(data.dropoffDate);

    const orderData = await orderShema.find({
      carId: data?.carId,
      status:'approved',
      paymentStatus: "Paid",
    });
    if (orderData.length !== 0) {
      const isConflict = orderDateValidation(orderData, pickupDate, dropoffDate);
      if (isConflict) {
        return res.status(400).json({
          message:
            "Date conflict: This car is not available for the selected dates.",
        });
      }
    }

    if (data.paymentMethod === "wallet") {
      const userWallet = await walletSchema.findOne({ userId: data.userId });
      if (userWallet.balance < data.totalPrice) {
        return res.status(400).json({
          message:
            "Insufficient Wallet Balance: Your wallet does not have sufficient funds to complete the transaction",
        });
      }
      const orderModel = new orderShema(data);
      await orderModel.save();

      const walletData = {
        amount: data.totalPrice,
        type: "debit",
        description: "Paid for car rental",
      };

      await walletSchema.updateOne(
        { userId: data.userId },
        {
          $inc: { balance: -data.totalPrice },
          $push: { history: walletData },
        }
      );

      return res.json({ message: "success", url: "" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Car Rental Booking",
            },
            unit_amount: data?.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}payment-success/${data?.orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}payment-fail`,
    });

    const orderModel = new orderShema(data);
    await orderModel.save();

    return res.json({ message: "success", url: session.url });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};
