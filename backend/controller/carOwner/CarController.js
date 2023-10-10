import carSchema from "../../models/carOwner/car.js";

export const uploadCar = async (req, res) => {
  try {
    const data = req.body;
    const matched = await carSchema.findOne({licensePlate: data.licensePlate});
    if(matched){
      return res.status(404).json({
        message: "Car with the provided license plate already exists.",
        error: true,
      });
    }
    
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
      console.log('resul of last', result,' end..');
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
