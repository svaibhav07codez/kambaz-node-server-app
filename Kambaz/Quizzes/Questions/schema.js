import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    title: String,
    question: String,
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    points: { type: Number, default: 1 },
    choices: [{ text: String, isCorrect: Boolean }],
    correctAnswer: Boolean,
    correctAnswers: [String],
  },
  { collection: "quiz_questions" }
);

export default schema;
