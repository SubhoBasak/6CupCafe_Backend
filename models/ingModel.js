import mongoose from "mongoose";

const ingSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 100, trim: true },
  curStock: { type: Number, default: 0 },
  unit: { type: String, required: true, trim: true, maxLength: 50 },
});

export default mongoose.model("ingModel", ingSchema);
