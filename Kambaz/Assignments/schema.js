import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    points: Number,
    due_date: Date,
    start_date: Date,
    until_date: Date,
  },
  { collection: "assignments" }
);

export default schema;
