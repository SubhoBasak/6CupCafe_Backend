import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 100, trim: true },
  charge: { type: Number, default: 0.0 },
});

export default mongoose.model("deliveryModel", deliverySchema);
