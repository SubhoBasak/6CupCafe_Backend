import mongoose from "mongoose";

const prodIngSchema = mongoose.Schema({
  prod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
    required: true,
    index: true,
  },
  ing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ingModel",
    required: true,
  },
  qnt: { type: Number, default: 0, min: 0 },
});

export default mongoose.model("prodIngModel", prodIngSchema);
