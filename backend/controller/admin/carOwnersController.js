import carOwnerSchema from "../../models/carOwner/carOwner.js";
import carSchema from "../../models/carOwner/car.js";

const LIMIT = 5;

export const carOwnersList = async (req, res) => {
  try {
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;
    const SKIP = (PAGE - 1) * LIMIT;

    const carownersData =
      (await carOwnerSchema
        .find()
        .populate("carId")
        .sort({ _id: -1 })
        .skip(SKIP)
        .limit(LIMIT)) ?? [];

    const TotalSize = await carOwnerSchema.countDocuments();
    const size = Math.ceil(TotalSize / LIMIT);

    return res.json({ message: "success", carownersData, size });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const ownerBlock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await carOwnerSchema.updateOne(
      { _id: id },
      { $set: { status: false } }
    );
    await carSchema.updateMany(
      { ownerId: id },
      { $set: { ownerStatus: false } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res
      .status(404)
      .json({ message: "Car-owner not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const ownerUnblock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await carOwnerSchema.updateOne(
      { _id: id },
      { $set: { status: true } }
    );
    await carSchema.updateMany(
      { ownerId: id },
      { $set: { ownerStatus: true } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res
      .status(404)
      .json({ message: "Car-owner not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
