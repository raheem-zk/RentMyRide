import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
