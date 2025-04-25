import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  app.post("/api/quizzes/:qid/attempts", async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const quizId = req.params.qid;
    const answers = req.body;
    const attempt = await dao.submitAttempt(quizId, userId, answers);
    res.json(attempt);
  });

  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const quizId = req.params.qid;
    const attempts = await dao.findAttempts(quizId, userId);
    res.json(attempts);
  });
}
