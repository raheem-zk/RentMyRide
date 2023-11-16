import modelSchema from "../../models/carOwner/model.js";
import { updateCarResourceStatus } from "../../utils/utils.js";

export const getModel = async (req, res) => {
  try {
    const modelData = await modelSchema.find().sort({ _id: -1 }) ?? [];

    if (modelData) {
      return res.json({ message: "success", modelData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateModelName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await modelSchema.updateOne(
      { _id: id },
      { $set: { name: name } }
    );
    
    if (result) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateModelStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await modelSchema.updateOne(
      { _id: id },
      { $set: { status: !status } },
      {
        upsert: true,
        new: true,
      }
    );
    await updateCarResourceStatus("model", id, !status)
    
    if (result) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
