import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
    },
    userId: String,
  },
  { timestamps: true }
);

const Issue = mongoose.models.Issue || mongoose.model("Issue", issueSchema);

export default Issue;
