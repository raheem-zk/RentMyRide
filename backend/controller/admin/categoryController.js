import categoryShema from "../../models/carOwner/category.js";

export const getCategory = async (req, res) => {
  try {
    const categoryData = await categoryShema.find().sort({ _id: -1 }) ?? [];

    if (categoryData) {
      return res.json({ message: "success", categoryData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateCategoryName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await categoryShema.updateOne(
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

export const updateCategoryStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await categoryShema.updateOne(
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
