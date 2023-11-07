import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ownerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarOwner",
    }
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatSchema);

export default chat;
