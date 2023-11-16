import transmissionSchema from "../../models/carOwner/transmission.js";

export const getTransmission = async (req, res) => {
  try {
    const transmissionData =
      (await transmissionSchema.find().sort({ _id: -1 })) ?? [];

    if (transmissionData) {
      return res.json({ message: "success", transmissionData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const updateTransmissionName = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await transmissionSchema.updateOne(
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

export const updateTransmissionStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await transmissionSchema.updateOne(
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
