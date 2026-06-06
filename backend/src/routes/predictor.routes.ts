import { Router } from "express";

import {
  predictCollege,
} from "../controllers/predictor.controller";

const router = Router();

router.post(
  "/",
  predictCollege
);

export default router;