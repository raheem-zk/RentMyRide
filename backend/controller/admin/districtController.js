import districtSchema from "../../models/carOwner/district.js";

export const getDistrict = async (req, res) => {
  try {
    const districtData = await districtSchema.find().sort({ _id: -1 }) ?? [];

    if (districtData) {
      return res.json({ message: "success", districtData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateDistrictName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await districtSchema.updateOne(
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

export const updateDistrictStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await districtSchema.updateOne(
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
