import mongoose from "mongoose";

const prodReportSchema = mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  prod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
    required: true,
  },
  count: { type: Number, default: 0, min: 0 },
});

export default mongoose.model("prodReportModel", prodReportSchema);
