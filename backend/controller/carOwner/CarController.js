import carSchema from "../../models/carOwner/car.js";

export const uploadCar = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, "  ...req.body");
    const result = await addCar(data);
    if (result) {
      return res.json({ message: "success" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCar = async (data) => {
  try {
    console.log(data);
    const carModel = new carSchema(data);
    let result = await carModel.save();
    if(result){
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
