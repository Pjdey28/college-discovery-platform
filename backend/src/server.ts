import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import collegeRoutes from "./routes/college.routes";
import compareRoutes from "./routes/compare.routes";
import predictorRoutes from "./routes/predictor.routes";
dotenv.config();

const app = express();

app.use(cors());

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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});