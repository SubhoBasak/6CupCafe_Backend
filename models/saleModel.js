import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  total: { type: Number, default: 0, min: 0 },
  payMethod: { type: Number, min: 0, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "customerModel" },
  orderType: { type: Number, min: 0, required: true },
  delivery: { type: mongoose.Schema.Types.ObjectId, ref: "deliveryModel" },
  completeTime: { type: Date },
  address: { type: String, trim: true },
  status: { type: Number, default: 0 },
  parcel: { type: Boolean },
  token: { type: Number },
  note: { type: String },
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
