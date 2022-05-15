import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category: { type: String, maxLength: 100, required: true, trim: true },
});

export default mongoose.model("categoryModel", categorySchema);
