import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  history: [
    {
      amount: Number,
      date: Date,
    },
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;