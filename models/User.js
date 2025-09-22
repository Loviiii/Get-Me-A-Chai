import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String },
  profilepic: { type: String, required: true },
  coverpic: { type: String, required: true },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
});

// Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
