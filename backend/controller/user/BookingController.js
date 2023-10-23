import OrderShema from "../../models/order.js";
import userSchema from "../../models/user.js";
// import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe'
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
    const orderModel = new OrderShema(data);
    await orderModel.save();
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

export const test = async (req, res) => {
  try {
    console.log('lkkkk')
    // console.log(process.env.STRIP_PRIVET_KEY)
    const AMOUT = 200
    // const paymentIntent = await stripe.paymentIntents.create({  // woriking not full
    //   amount: AMOUT, // Replace with the actual order amount calculation
    //   currency: 'inr',
    //   statement_descriptor_suffix: 'Payment using Stripe',
    //   automatic_payment_methods: { enabled: true }, // Specify the payment method types you want to accept (e.g., 'card')
    // });
    console.log(req.body);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "Inr",
      amount: AMOUT * 100,
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);

    res.json({message:'success',clientSecret: paymentIntent.client_secret,});
  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json({ message: "Internal server error", error: true });
  }
};
