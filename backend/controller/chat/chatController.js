import chatSchema from "../../models/chat.js";

export const createChat = async (req, res) => {
  try {
    const { userId, ownerId } = req.body;

    const existed = await chatSchema.findOne({ userId, ownerId });

    if (existed) {
      return res.json({ message: "success" });
    }

    const newChat = new chatSchema({
      ownerId,
      userId,
    });
    const result = await newChat.save();
    return res.json({ message: "success", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userChats = async (req, res) => {
  try {
    const id = req.params.userId;

    const chats = await chatSchema
    .find({
      $or: [{ userId: id }, { ownerId: id }]
    })
      .populate("userId")
      .populate("ownerId");

    return res.json({ message: "success", chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await chatSchema.findOne({
      member: { $all: [req.params.firstId, req.params.secondId] },
    });
    return res.json({ message: "success", chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
