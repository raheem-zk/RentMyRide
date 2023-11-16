import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
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

const District = mongoose.model("District", districtSchema);

export default District;
