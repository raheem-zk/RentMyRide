import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarOwner",
  },
  carName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  images: {
    type: [String], // An array of image URLs
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  year: {
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
    type: String,
    default: "Pending",
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
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  },
  availability: {
    type: String,
    default: 'Available', //[Available, Unavailable, Rented]
  },
  ownerStatus: {
    type: Boolean,
    default: true,
  },
  resourceStatuses: {
    model : {
      type: Boolean,
      default: true,
    },
    transmission : {
      type: Boolean,
      default: true,
    },
    category : {
      type: Boolean,
      default: true,
    },
    brand: {
      type: Boolean,
      default: true,
    },
    fuelType : {
      type: Boolean,
      default: true,
    },
    district: {
      type: Boolean,
      default: true,
    },
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  }
});

const Car = mongoose.model("Car", carSchema);

export default Car;
