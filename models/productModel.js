import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 200, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryModel",
    required: true,
  },
  stock: { type: Number, default: 0, min: 0 },
  note: { type: String, trim: true },
});

export default mongoose.model("productModel", productSchema);
