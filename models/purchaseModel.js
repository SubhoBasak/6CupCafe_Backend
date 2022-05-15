import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
  ing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ingModel",
    required: true,
  },
  date: { type: Date, default: Date.now },
  qnt: { type: Number, required: true, min: 0 },
  cost: { type: Number, required: true, min: 0 },
});

export default mongoose.model("purchaseModel", purchaseSchema);
