import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createQuestion(quizId) {
  return model.create({
    _id: uuidv4(),
    quizId,
    title: "New Question",
    type: "MULTIPLE_CHOICE",
    points: 1,
    question: "",
    choices: [],
  });
}

export function findQuestionsByQuiz(quizId) {
  return model.find({ quizId });
}

export function updateQuestion(id, updates) {
  return model.updateOne({ _id: id }, updates);
}

export function deleteQuestion(id) {
  return model.deleteOne({ _id: id });
}
