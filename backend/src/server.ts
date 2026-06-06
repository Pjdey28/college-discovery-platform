import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import collegeRoutes from "./routes/college.routes";
import compareRoutes from "./routes/compare.routes";
import predictorRoutes from "./routes/predictor.routes";
import savedRoutes from "./routes/saved.routes";
import discussionRoutes from "./routes/discussion.routes";
import reviewRoutes from "./routes/review.routes"
dotenv.config();

const app = express();

app.use(cors({
    origin:
      process.env.FRONTEND_URL,
    credentials:true,
  }));

app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "College Discovery API"
  });
});
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/colleges",
  collegeRoutes
);
app.use(
  "/api/compare",
  compareRoutes
);
app.use(
  "/api/predictor",
  predictorRoutes
);
app.use(
  "/api/saved",
  savedRoutes
);
app.use(
 "/api/discussions",
 discussionRoutes
);
app.use(
 "/api/reviews",
 reviewRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});