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
    reward: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("customerModel", customerSchema);
