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
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  place: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  age: {
    type: Number,
    trim: true,
    required: true,
    max: 99,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  license: {
    type: String,
    trim: true,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
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
