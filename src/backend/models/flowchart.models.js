import mongoose, { Schema } from "mongoose";

const flowchartSchema = new Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true,
    },
    chart: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Flowchart = mongoose.model("Flowchart", flowchartSchema);
