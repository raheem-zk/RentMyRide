import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    unique: true,
  },
  place: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  age: {
    type: Number,
    trim: true,
    max: 80,
  },
  address: {
    type: String,
    trim: true,
  },
  license: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
