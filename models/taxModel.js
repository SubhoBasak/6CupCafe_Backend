import mongoose from "mongoose";

const taxSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 100, trim: true },
  tax: { type: Number, required: true },
});

export default mongoose.model("taxModel", taxSchema);
