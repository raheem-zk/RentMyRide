import carSchema from '../../models/carOwner/car.js';

export const uploadCar = async (req, res)=>{
    try {
        const data = req.body;
        addCar(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
export const addCar = async (data)=>{
    try {
      console.log(data);
        // const carModel = new carSchema(data)
        // await carModel.save();
        return res.json({message:'success'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }