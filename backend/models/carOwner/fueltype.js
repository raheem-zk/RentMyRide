import mongoose from "mongoose";

const fuelTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const FuelType = mongoose.model("FuelType", fuelTypeSchema);

export default FuelType;
