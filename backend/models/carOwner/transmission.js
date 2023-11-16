import mongoose from "mongoose";

const transmissionSchema = new mongoose.Schema({
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

const Transmission = mongoose.model("Transmission", transmissionSchema);

export default Transmission;
