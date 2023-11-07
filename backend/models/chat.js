import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatSchema);

export default chat;
