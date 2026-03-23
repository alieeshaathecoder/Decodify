import mongoose, { Schema } from "mongoose";

const timeComplexitySchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  complexity: {
    type: String,
    required: true,
  },
});

const TimeComplexity = mongoose.model("TimeComplexity", timeComplexitySchema);
export default TimeComplexity;
