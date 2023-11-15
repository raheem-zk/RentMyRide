import brandSchema from "../../models/carOwner/brand.js";

export const getBrand = async (req, res) => {
  try {
    const brandData = (await brandSchema.find().sort({ _id: -1 })) ?? [];
    if (brandData) {
      return res.json({ message: "success", brandData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateBrandName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await brandSchema.updateOne(
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

export const updateBrandStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await brandSchema.updateOne(
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
