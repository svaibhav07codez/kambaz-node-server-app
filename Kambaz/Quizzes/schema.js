import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "New Quiz" },
    description: String,
    course: { type: String, ref: "CourseModel" },
    createdBy: String,
    published: { type: Boolean, default: false },
    availableFrom: Date,
    availableUntil: Date,
    dueDate: Date,
    quizType: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["Immediately", "After Due Date", "Never"],
      default: "Immediately",
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    webcamRequired: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    lockAfterAnswer: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    points: { type: Number, default: 0 },
  },
  { collection: "quizzes", timestamps: true }
);

export default schema;
