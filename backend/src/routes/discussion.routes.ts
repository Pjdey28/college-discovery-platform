import { Router }
from "express";

import {
  createDiscussion,
  getDiscussions,
  addAnswer
}
from "../controllers/discussion.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  getDiscussions
);

router.post(
  "/",protect,
  createDiscussion
);

router.post(
  "/:id/answer", protect,
  addAnswer
);

export default router;