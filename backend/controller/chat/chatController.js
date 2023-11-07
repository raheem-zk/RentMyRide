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
    const chat = chatSchema.find({
      member: { $in: [req.params.userId] },
    });
    return res.json({ message: "success", chat });
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
