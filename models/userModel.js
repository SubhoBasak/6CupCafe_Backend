import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: { type: Number, required: true, min: 0, max: 4, default: 0 },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 200,
    trim: true,
    index: true,
  },
  name: { type: String, required: true, maxLength: 100, trim: true },
  password: { type: String, required: true, trim: true },
});

export default mongoose.model("userModel", userSchema);
