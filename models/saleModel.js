import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  total: { type: Number, default: 0, min: 0 },
  payMethod: { type: String, required: true, maxLength: "5" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "customerModel" },
  orderType: { type: Number, min: 0 },
  address: { type: String, trim: true },
  status: { type: Boolean, default: false },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
        required: true,
      },
      quantity: { type: Number, default: 1, min: 0 },
    },
  ],
});

export default mongoose.model("saleModel", saleSchema);
