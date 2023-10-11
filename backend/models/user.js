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
    require: true,
    minlength: 7,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    require: true,
    unique: true,
  },
  place: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32,
  },
  age: {
    type: Number,
    trim: true,
    require: true,
    max: 80,
  },
  address: {
    type: String,
    trim: true,
    require: true,
  },
  license: {
    type: String,
    trim: true,
    require: true,
  },
  profilePicture: {
    type: String,
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
