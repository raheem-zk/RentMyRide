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
      type: {
        type: String,
        enum: ['credit', 'debit'], // Possible values: 'credit' or 'debit'
        required: true,
      },
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;