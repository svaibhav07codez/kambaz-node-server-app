import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  //   app.get("/api/enrollments/:userId", (req, res) => {
  //     const { userId } = req.params;
  //     const enrollments = enrollmentsDao.getEnrollmentsByUser(userId);
  //     res.send(enrollments);
  //   });

  app.post("/api/enrollments/:courseId/:userId", (req, res) => {
    const { courseId, userId } = req.params;
    const status = enrollmentsDao.enrollUserInCourse(courseId, userId);
    res.send(status);
  });

  app.delete("/api/enrollments/:courseId/:userId", (req, res) => {
    const { courseId, userId } = req.params;
    const status = enrollmentsDao.unenrollUserFromCourse(courseId, userId);
    res.send(status);
  });
}
