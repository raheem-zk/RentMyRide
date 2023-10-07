import carSchema from "../../models/carOwner/car.js";

export const carList = async (req, res) => {
  try {
    console.log("cars list");
    const data = (await carSchema.find()) ?? [];
    console.log(data);
    return res.json({ message: "success", carsData: data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const carApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carSchema.updateOne(
      { _id: id },
      { $set: { status: "Approved" } }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "Car not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const carRejected = async (req, res) => {
  try {
    const id = req.params.id;
    const message = req.params.message;
    console.log(message,  req.params);
    const result = await carSchema.updateOne(
      { _id: id },
      { $set: { status: "Rejected" } }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "Success" });
    }
    return res.status(404).json({ message: "Car not found", error: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
