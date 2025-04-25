import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  const isFaculty = (req, res, next) => {
    const role = req.session?.currentUser?.role;
    if (role === "FACULTY") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Faculty only." });
    }
  };

  app.post("/api/quizzes/:qid/questions", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const question = await dao.createQuestion(qid);
    res.json(question);
  });

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestionsByQuiz(qid);
    res.json(questions);
  });

  app.put("/api/questions/:qid", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const updates = req.body;
    const status = await dao.updateQuestion(qid, updates);
    res.send(status);
  });

  app.delete("/api/questions/:qid", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuestion(qid);
    res.send(status);
  });
}
