import { Router } from "express";

import {
    getCollegeById,
  getColleges,
  getTrendingColleges,
} from "../controllers/college.controller";

const router = Router();

router.get(
  "/",
  getColleges
);

router.get(
  "/trending",
  getTrendingColleges
);

router.get("/:id", getCollegeById);

export default router;