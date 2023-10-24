import orderShema from "../../models/order.js";
import userSchema from "../../models/user.js";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIP_PRIVET_KEY);

export const rentBooking = async (req, res) => {
  try {
    const data = req.body;
    const result = await userSchema.updateOne(
      { _id: data.userId },
      {
        $set: {
          license: data.license,
          address: data.address,
        },
      }
    );
    const orderModel = new orderShema(data);
    await orderModel.save();
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

    const orderData = await orderShema.find({ carId: data?.carId });

    if (orderData) {
      const isConflict = orderData.some((order) => {
        const orderPickupDate = new Date(order.pickupDate);
        const orderDropoffDate = new Date(order.dropoffDate);

        if (orderPickupDate < pickupDate && orderDropoffDate < pickupDate) {
          return true;
        } else if (
          pickupDate < orderPickupDate &&
          dropoffDate < orderPickupDate
        ) {
          return true;
        }
        return false;
      });

      if (!isConflict) {
        return res.status(400).json({
          message:
            "Date conflict: This car is not available for the selected dates.",
        });
      }
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

    return res.json({ message: "success", url: session.url });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};
