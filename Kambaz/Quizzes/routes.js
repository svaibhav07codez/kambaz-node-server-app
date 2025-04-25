import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const isFaculty = (req, res, next) => {
    const role = req.session["currentUser"].role;
    if (role === "FACULTY") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Faculty only." });
    }
  };

  app.post("/api/courses/:cid/quizzes", isFaculty, async (req, res) => {
    const { cid } = req.params;
    const userId = req.session["currentUser"]?._id || "anonymous";
    const quiz = await dao.createQuiz(cid, userId);
    res.json(quiz);
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });

  app.delete("/api/quizzes/:qid", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.send(status);
  });

  app.patch("/api/quizzes/:qid/publish", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.togglePublish(qid);
    res.json(quiz);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  });

  app.put("/api/quizzes/:qid", isFaculty, async (req, res) => {
    const { qid } = req.params;
    const updates = req.body;
    const status = await dao.updateQuiz(qid, updates);
    res.send(status);
  });
}
