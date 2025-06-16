import mongoose from "mongoose";
const recordSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
});

export const Record = mongoose.model("Record", recordSchema);
