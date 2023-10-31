import carSchema from "../../models/carOwner/car.js";
import ownerSchema from '../../models/carOwner/carOwner.js';

export const uploadCar = async (req, res) => {
  try {
    const data = req.body;
    
    const result = await addCar(data);
    if (result) {
      return res.json({ message: "success" });
    }else{
      return res.status(404).json({
        message: "Car with the provided license plate already exists.",
        error: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCar = async (data) => {
  try {
    delete data._id
    const matched = await carSchema.findOne({licensePlate: data.licensePlate});
    if(matched){
      return false
    }
    const carModel = new carSchema(data);
    let result = await carModel.save();
    if(result){
      const  results = await ownerSchema.updateOne(
        { _id: data.ownerId }, 
        { $push: { carId: result._id } }
      );
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
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editCar = async (req, res)=>{
  try {
    const { carId } = req.params;
    const data = req.body;
    const response = await carSchema.findOne({licensePlate : data.licensePlate});
    if(response){
      if(response._id !== data._id){
        return res.status(404).json({
          message: "Car with the provided license plate already exists.",
          error: true,
        });
      }
    }
    await carSchema.updateOne({_id: carId},{$set: data});
    return res.json({message:'success'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}