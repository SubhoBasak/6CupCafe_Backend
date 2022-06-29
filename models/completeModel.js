import mongoose from "mongoose";

const completeSchema = mongoose.Schema({
  token: { type: Number, required: true },
});

export default mongoose.model("completeModel", completeSchema);
