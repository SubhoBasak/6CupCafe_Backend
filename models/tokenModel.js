import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  start: { type: Number, default: 1 },
});

export default mongoose.model("tokenModel", tokenSchema);
