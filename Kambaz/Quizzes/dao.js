import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createQuiz(courseId, userId) {
  const quiz = {
    _id: uuidv4(),
    course: courseId,
    createdBy: userId,
    title: "New Quiz",
    published: false,
  };
  return model.create(quiz);
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId }).sort({ createdAt: -1 });
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function togglePublish(quizId) {
  return model.findById(quizId).then((quiz) => {
    quiz.published = !quiz.published;
    return quiz.save();
  });
}

export const findQuizById = (id) => model.findById(id);

export const updateQuiz = (id, updates) =>
  model.updateOne({ _id: id }, updates);
