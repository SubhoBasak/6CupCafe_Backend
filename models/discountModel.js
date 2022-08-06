import mongoose from "mongoose";

const discountSchema = mongoose.Schema({
  name: { type: String, maxLength: 100, trim: true, required: true },
  disc: { type: Number, min: 0, required: true },
  mode: { type: Boolean, required: true },
});

export default mongoose.model("discountModel", discountSchema);
