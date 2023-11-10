import userModel from "../../models/user.js";

const LIMIT = 10;

export const userList = async (req, res) => {
  try {
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;
    const SKIP = (PAGE - 1) * LIMIT;

    const userData = await userModel
      .find()
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);
      
    const TotalSize = await userModel.countDocuments();
    const size = Math.ceil(TotalSize / LIMIT);

    return res.json({ message: "success", userData, size });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const userUnblock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userModel.updateOne(
      { _id: id },
      { $set: { status: true } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "User not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const userBlock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userModel.updateOne(
      { _id: id },
      { $set: { status: false } }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "User not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
