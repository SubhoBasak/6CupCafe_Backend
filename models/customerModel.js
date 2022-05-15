import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 100, trim: true },
    phone: {
      type: String,
      required: true,
      maxLength: 13,
      minLength: 10,
      trim: true,
      index: true,
    },
    note: { type: String, trim: true },
    expressTotal: { type: Number, default: 0, min: 0 },
    expressBilling: { type: Number, default: 0, min: 0 },
    deliveryTotal: { type: Number, default: 0, min: 0 },
    homeDelivery: { type: Number, default: 0, min: 0 },
    cashMode: { type: Number, default: 0 },
    cardMode: { type: Number, default: 0 },
    upiMode: { type: Number, default: 0 },
    reward: { type: Number, default: 0, min: 0 },
  },
  { timestamp: true }
);

export default mongoose.model("customerModel", customerSchema);
