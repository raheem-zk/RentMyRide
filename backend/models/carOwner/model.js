import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const Model = mongoose.model("Model", modelSchema);

export default Model;
