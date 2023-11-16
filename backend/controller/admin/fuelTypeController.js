import fuelTypeSchema from "../../models/carOwner/fueltype.js";

export const getFuelType = async (req, res) => {
  try {
    const fuelTypeData = await fuelTypeSchema.find().sort({ _id: -1 }) ?? [];

    if (fuelTypeData) {
      return res.json({ message: "success", fuelTypeData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateFuelTypeName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await fuelTypeSchema.updateOne(
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

export const updateFuelTypeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await fuelTypeSchema.updateOne(
      { _id: id },
      { $set: { status: !status } },
      {
        upsert: true,
        new: true,
      }
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
