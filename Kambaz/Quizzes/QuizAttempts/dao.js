import AttemptModel from "./model.js";
import QuestionModel from "../Questions/model.js";
import { v4 as uuidv4 } from "uuid";

export async function submitAttempt(quizId, userId, studentAnswers) {
  const questions = await QuestionModel.find({ quizId });
  let score = 0;

  const answers = questions.map((q) => {
    const studentAnswer = studentAnswers[q._id];

    let correct = false;
    if (q.type === "MULTIPLE_CHOICE") {
      const correctChoice = q.choices.find((c) => c.isCorrect);
      correct = correctChoice?.text === studentAnswer;
    } else if (q.type === "TRUE_FALSE") {
      correct = q.correctAnswer === studentAnswer;
    } else if (q.type === "FILL_BLANK") {
      correct = q.correctAnswers.some(
        (ans) =>
          ans.toLowerCase().trim() === studentAnswer?.toLowerCase().trim()
      );
    }

    if (correct) score += q.points;

    return {
      questionId: q._id,
      answer: studentAnswer,
      correct,
    };
  });

  const attempt = {
    _id: uuidv4(),
    quizId,
    userId,
    answers,
    score,
    submittedAt: new Date(),
  };

  return await AttemptModel.create(attempt);
}

export async function findAttempts(quizId, userId) {
  return await AttemptModel.find({ quizId, userId }).sort({ submittedAt: -1 });
}
