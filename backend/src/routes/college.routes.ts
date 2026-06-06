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

router.get("/:id", getCollegeById);
router.get(
  "/trending",
  getTrendingColleges
);

export default router;