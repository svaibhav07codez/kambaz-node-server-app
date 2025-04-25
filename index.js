import "dotenv/config";
import express from "express";
import Hello from "./Hello.js";
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";
import QuestionRoutes from "./Kambaz/Quizzes/Questions/routes.js";
import QuizAttemptRoutes from "./Kambaz/Quizzes/QuizAttempts/routes.js";
import session from "express-session";
import mongoose from "mongoose";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
  
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", process.env.NETLIFY_URL, "https://cheerful-paletas-542018.netlify.app"],
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
QuizAttemptRoutes(app);

Lab5(app);
Hello(app);
const PORT = process.env.PORT || 4000;

console.log("CORS origin:", process.env.NETLIFY_URL);
console.log("MONGO URI:", process.env.MONGO_CONNECTION_STRING);
console.log("NODE ENV:", process.env.NODE_ENV);
console.log("Server starting...");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//app.listen(process.env.PORT || 4000);
