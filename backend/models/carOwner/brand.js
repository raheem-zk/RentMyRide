import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
