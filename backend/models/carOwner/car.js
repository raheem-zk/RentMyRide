import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  image: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  transmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transmission",
},
  perDayPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Model",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FuelType",
  },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
