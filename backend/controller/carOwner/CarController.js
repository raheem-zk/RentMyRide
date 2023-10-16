import carSchema from "../../models/carOwner/car.js";
import ownerSchema from '../../models/carOwner/carOwner.js';

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
    const carModel = new carSchema(data);
    let result = await carModel.save();
    console.log(result, 'the uploded car result ');
    if(result){
      const  results = await ownerSchema.updateOne(
        { _id: data.ownerId }, 
        { $push: { carId: result._id } }
      );
      console.log('result', result._id, results);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const cars = async (req, res)=>{
  try {
    const { ownerId } = req.params;
    const carsData = await carSchema.find({ownerId})
    .populate("fuelType")
    .populate("transmission")
    .populate("brand")
    .populate("model")
    .populate("category");
    return res.json({message:'success', carsData})
  } catch (error) {
    
  }
}