import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    quizId: String,
    userId: String,
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
        correct: Boolean,
      },
    ],
    score: Number,
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default schema;
